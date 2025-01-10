import { NextResponse } from "next/server";
import { Result } from "../../../../lib/models/result.model";
import { connectToDB } from "../../../../lib/mongodb";
import { companydata } from "@/constants/companies";
import { internshipCompanies } from "@/constants/intern";
import { ResultData } from "../../../../types/result";

const CTC_TIERS = {
    fullTime: {
        sPlusTier: 30,
        aPlusTier: 20,
        aTier: 10,
        bTier: 5,
        cTier: 0
    },
    intern: {
        sPlusTier: 100000,
        aPlusTier: 50000,
        aTier: 25000,
        bTier: 10000,
        cTier: 0
    }
} as const;

export async function GET(req: Request) {
    try {
        await connectToDB();

        const url = new URL(req.url);
        const rollNo = url.searchParams.get('ROLL_NO');

        if (!rollNo) {
            return NextResponse.json({ error: "Roll number is required" }, { status: 400 });
        }

        const result = await Result.findOne({ rollNumber: rollNo }).lean() as ResultData;

        if (!result) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const placementType = result.admissionYear === 2023 ? "intern" : "fullTime";
        const ctcTiers = CTC_TIERS[placementType];

        // Helper function to process companies and calculate eligibility
        const processCompanies = (companies: typeof companydata | typeof internshipCompanies) => {
            const canAllowedCompanies: (typeof companies)[number][] = [];
            const allowedCompanies: (typeof companies)[number][] = [];
            const updatedCgpaCompanies: (typeof companies)[number][] = [];
            let updatedCGPA = 0;

            // Tier counters for each category
            const eligibleTiers = {
                sPlusTier: 0,
                aPlusTier: 0,
                aTier: 0,
                bTier: 0,
                cTier: 0
            };
            const allowedTiers = { ...eligibleTiers };
            const updatedCgpaTiers = { ...eligibleTiers };

            for (const company of companies) {
                if (!company.branches.includes(result.discipline)) continue;

                canAllowedCompanies.push(company);
                // Count eligible companies by tier
                if (company.ctc && company.ctc >= ctcTiers.sPlusTier) eligibleTiers.sPlusTier++;
                else if (company.ctc && company.ctc >= ctcTiers.aPlusTier) eligibleTiers.aPlusTier++;
                else if (company.ctc && company.ctc >= ctcTiers.aTier) eligibleTiers.aTier++;
                else if (company.ctc && company.ctc >= ctcTiers.bTier) eligibleTiers.bTier++;
                else if (company.ctc) eligibleTiers.cTier++;

                const cutoff = typeof company.cutoff === 'string' ? parseFloat(company.cutoff) : company.cutoff;

                if (result.aggregatedCgpa >= cutoff) {
                    allowedCompanies.push(company);
                    // Count allowed companies by tier
                    if (company.ctc && company.ctc >= ctcTiers.sPlusTier) allowedTiers.sPlusTier++;
                    else if (company.ctc && company.ctc >= ctcTiers.aPlusTier) allowedTiers.aPlusTier++;
                    else if (company.ctc && company.ctc >= ctcTiers.aTier) allowedTiers.aTier++;
                    else if (company.ctc && company.ctc >= ctcTiers.bTier) allowedTiers.bTier++;
                    else if (company.ctc) allowedTiers.cTier++;
                }

                const roundedCGPA = Math.ceil(result.aggregatedCgpa * 2) / 2;
                if (roundedCGPA >= cutoff) {
                    updatedCGPA = roundedCGPA;
                    updatedCgpaCompanies.push(company);
                    // Count updated CGPA companies by tier
                    if (company.ctc && company.ctc >= ctcTiers.sPlusTier) updatedCgpaTiers.sPlusTier++;
                    else if (company.ctc && company.ctc >= ctcTiers.aPlusTier) updatedCgpaTiers.aPlusTier++;
                    else if (company.ctc && company.ctc >= ctcTiers.aTier) updatedCgpaTiers.aTier++;
                    else if (company.ctc && company.ctc >= ctcTiers.bTier) updatedCgpaTiers.bTier++;
                    else if (company.ctc) updatedCgpaTiers.cTier++;
                }
            }

            return {
                canAllowedCompanies,
                allowedCompanies,
                updatedCgpaCompanies,
                updatedCGPA,
                totalCompanies: companies.length,
                eligibleTiers,
                allowedTiers,
                updatedCgpaTiers
            };
        };

        const companies = result.admissionYear === 2023 ? internshipCompanies : companydata;
        const {
            canAllowedCompanies,
            allowedCompanies,
            updatedCgpaCompanies,
            updatedCGPA,
            totalCompanies,
            eligibleTiers,
            allowedTiers,
            updatedCgpaTiers
        } = processCompanies(companies);

        const companiesData = [
            {
                title: "Eligible Companies for your branch",
                total: totalCompanies,
                allows: canAllowedCompanies.length,
                tiers: eligibleTiers
            },
            {
                title: "Allowed Companies for you",
                total: canAllowedCompanies.length,
                allows: allowedCompanies.length,
                tiers: allowedTiers
            },
            {
                title: "Updated CGPA Companies for you",
                total: canAllowedCompanies.length,
                allows: updatedCgpaCompanies.length,
                tiers: updatedCgpaTiers
            }
        ]
        const consolidatedData = {
            ...result,
            updatedCGPA,
            ctcTiers,
            placementType,
            companiesData
        };

        return NextResponse.json(consolidatedData);

    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

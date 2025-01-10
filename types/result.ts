export type SemesterResult = {
    semesterNumber: number;
    credits: number;
    cgpa: number;
    _id: string;
    createdAt: string;
    updatedAt: string;
    courseRank: number;
    majorRank: number;
};

export type AggregatedData = {
    MEAN: number;
    MEDIAN: number;
    MODE: number;
};

export type CTCTiers = {
    sPlusTier: number;
    aPlusTier: number;
    aTier: number;
    bTier: number;
    cTier: number;
};

export type CompanyTierData = {
    title: string;
    total: number;
    allows: number;
    tiers: CTCTiers;
};

export type ResultData = {
    _id: string;
    name: string;
    rollNumber: string;
    admissionYear: number;
    graduationYear: number;
    discipline: string;
    major: string;
    course: string;
    college: string;
    university: string;
    semesterResults: SemesterResult[];
    aggregatedCgpa: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
    collegeRank: number;
    courseRank: number;
    majorRank: number;
    universityRank: number;
    updatedCGPA: number;
    ctcTiers: CTCTiers;
    placementType: 'fullTime';
    companiesData: CompanyTierData[];
};

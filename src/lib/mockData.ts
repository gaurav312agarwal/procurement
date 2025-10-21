// Enhanced mock data generator for P2P Dashboard with comprehensive drilldowns

export interface FilterState {
  dateRange: string;
  businessUnit: string;
  region: string;
  supplier: string;
  invoiceType: string;
}

export const businessUnits = ['All', 'North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East'];
export const regions = ['All', 'US East', 'US West', 'UK', 'Germany', 'France', 'China', 'Japan', 'Australia', 'UAE', 'Brazil'];
export const suppliers = ['All', 'Acme Corp', 'TechSupply Inc', 'Global Parts Ltd', 'Premier Solutions', 'MegaVendor Co', 'Alpha Industries', 'Beta Systems', 'Gamma Trading'];
export const invoiceTypes = ['All', 'EDI', 'OCR', 'Manual', 'Portal'];
export const dateRanges = ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'Year to Date', 'Custom'];
export const categories = ['CapEx', 'OpEx', 'Services', 'MRO'];
export const departments = ['IT', 'Operations', 'Facilities', 'HR', 'Finance', 'Marketing'];
export const invoiceStatuses = ['Approved', 'Pending', 'Rejected'];
export const countries = ['USA', 'Canada', 'UK', 'Germany', 'France', 'Spain', 'China', 'Japan', 'Australia', 'India', 'UAE', 'Brazil'];

const getFilterMultiplier = (filters: FilterState): number => {
  let multiplier = 1;
  if (filters.businessUnit !== 'All') multiplier *= 0.25;
  if (filters.region !== 'All') multiplier *= 0.4;
  if (filters.supplier !== 'All') multiplier *= 0.15;
  if (filters.invoiceType !== 'All') multiplier *= 0.6;
  return multiplier;
};

export const generateKPIData = (filters: FilterState) => {
  const multiplier = getFilterMultiplier(filters);
  
  return {
    earlyPayDiscountRate: {
      current: Math.round(65 + Math.random() * 15 * multiplier),
      target: 75,
      trend: (Math.random() * 10 - 3).toFixed(1)
    },
    annualizedReturn: {
      returnRate: (10 + Math.random() * 8 * multiplier).toFixed(1),
      costOfCapital: (5.5 + Math.random() * 2).toFixed(1),
      netBenefit: (4.5 + Math.random() * 6 * multiplier).toFixed(1)
    },
    touchlessInvoiceRate: {
      touchless: Math.round(68 + Math.random() * 20 * multiplier),
      manual: Math.round(32 - Math.random() * 20 * multiplier)
    },
    onTimePaymentRate: {
      rate: Math.round(88 + Math.random() * 10 * multiplier),
      volume: Math.round(45230 * multiplier),
      trend: (Math.random() * 6 - 1).toFixed(1)
    }
  };
};

export const generateInvoiceIngestionData = (filters: FilterState) => {
  const multiplier = getFilterMultiplier(filters);
  const base = 1000 * multiplier;
  
  return [
    { method: 'EDI', count: Math.round(base * (0.42 + Math.random() * 0.08)), percentage: 42 },
    { method: 'OCR', count: Math.round(base * (0.31 + Math.random() * 0.06)), percentage: 31 },
    { method: 'Portal', count: Math.round(base * (0.18 + Math.random() * 0.04)), percentage: 18 },
    { method: 'Manual', count: Math.round(base * (0.09 + Math.random() * 0.03)), percentage: 9 }
  ];
};

export const generatePOCycleTimeData = (filters: FilterState) => {
  const multiplier = getFilterMultiplier(filters);
  return Array.from({ length: 12 }, (_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    avgDays: Math.round(6 + Math.random() * 6 + (1 - multiplier) * 2),
    target: 8,
    volume: Math.round(500 * multiplier + Math.random() * 200)
  }));
};

export const generateInvoiceCycleTimeData = (filters: FilterState) => {
  const multiplier = getFilterMultiplier(filters);
  const count = Math.round(200 * multiplier);
  
  return Array.from({ length: count }, (_, i) => ({
    invoiceId: `INV-${10000 + i}`,
    days: Math.round(2 + Math.random() * 18),
    vendor: suppliers[Math.floor(Math.random() * (suppliers.length - 1)) + 1],
    amount: Math.round(500 + Math.random() * 99500),
    status: invoiceStatuses[Math.floor(Math.random() * invoiceStatuses.length)]
  }));
};

export const generateOnTimePaymentData = (filters: FilterState) => {
  const multiplier = getFilterMultiplier(filters);
  return Array.from({ length: 12 }, (_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    rate: Math.round(85 + Math.random() * 12),
    volume: Math.round(3000 * multiplier + Math.random() * 1000)
  }));
};

export const generateSupplierComplianceData = (filters: FilterState) => {
  const regionList = filters.region === 'All' ? regions.slice(1, 9) : [filters.region];
  return regionList.map(region => ({
    region,
    compliance: Math.round(82 + Math.random() * 16),
    suppliers: Math.round(15 + Math.random() * 35)
  }));
};

export const generateInvoiceExceptionsData = (filters: FilterState) => {
  const multiplier = getFilterMultiplier(filters);
  const base = 400 * multiplier;
  
  return [
    { reason: 'Price Mismatch', count: Math.round(base * 0.32), percentage: 32, color: 'hsl(var(--neon-purple))' },
    { reason: 'Missing PO', count: Math.round(base * 0.25), percentage: 25, color: 'hsl(var(--neon-orange))' },
    { reason: 'Quantity Variance', count: Math.round(base * 0.21), percentage: 21, color: 'hsl(var(--neon-cyan))' },
    { reason: 'Tax Error', count: Math.round(base * 0.13), percentage: 13, color: 'hsl(var(--neon-yellow))' },
    { reason: 'Other', count: Math.round(base * 0.09), percentage: 9, color: 'hsl(var(--chart-5))' }
  ];
};

export const generateCostSavingsData = (filters: FilterState) => {
  const multiplier = getFilterMultiplier(filters);
  const base = 50000000 * multiplier;
  
  return [
    { stage: 'Opportunities', value: Math.round(base * 1.0), displayValue: (base / 1000000).toFixed(1) },
    { stage: 'Negotiated', value: Math.round(base * 0.75), displayValue: (base * 0.75 / 1000000).toFixed(1) },
    { stage: 'Realized', value: Math.round(base * 0.58), displayValue: (base * 0.58 / 1000000).toFixed(1) }
  ];
};

export const generateWorkingCapitalData = (filters: FilterState) => {
  const multiplier = getFilterMultiplier(filters);
  
  return [
    { category: 'Starting DPO', value: 42, type: 'neutral' },
    { category: 'Early Pay Discount', value: 8 * multiplier, type: 'positive' },
    { category: 'Payment Extension', value: 6 * multiplier, type: 'positive' },
    { category: 'Process Delays', value: -3, type: 'negative' },
    { category: 'Final DPO', value: 53, type: 'neutral' }
  ];
};

// Drilldown Level 1 generators
export const generateEarlyPayDrilldown1 = (filters: FilterState) => {
  const units = filters.businessUnit === 'All' ? businessUnits.slice(1) : [filters.businessUnit];
  return units.map(bu => ({
    name: bu,
    value: Math.round(60 + Math.random() * 25),
    target: 75,
    volume: Math.round(500 + Math.random() * 1000)
  }));
};

export const generateEarlyPayDrilldown2 = (parent: string) => {
  return suppliers.slice(1, 6).map(s => ({
    name: s,
    value: Math.round(55 + Math.random() * 30),
    target: 75,
    discountOffered: (1.5 + Math.random() * 2).toFixed(1),
    utilization: Math.round(60 + Math.random() * 35)
  }));
};

export const generateAnnualizedReturnDrilldown1 = (filters: FilterState) => {
  const regionList = filters.region === 'All' ? regions.slice(1, 7) : [filters.region];
  return regionList.map(region => ({
    name: region,
    returnRate: (8 + Math.random() * 10).toFixed(1),
    costOfCapital: (5 + Math.random() * 3).toFixed(1),
    netBenefit: (3 + Math.random() * 7).toFixed(1)
  }));
};

export const generateAnnualizedReturnDrilldown2 = (parent: string) => {
  return suppliers.slice(1, 6).map(s => ({
    name: s,
    returnRate: (7 + Math.random() * 12).toFixed(1),
    volume: Math.round(500000 + Math.random() * 4500000)
  }));
};

export const generateInvoiceIngestionDrilldown1 = (filters: FilterState) => {
  const vendorList = filters.supplier === 'All' ? suppliers.slice(1, 7) : [filters.supplier];
  return vendorList.map(vendor => ({
    name: vendor,
    EDI: Math.round(150 + Math.random() * 350),
    OCR: Math.round(100 + Math.random() * 200),
    Portal: Math.round(80 + Math.random() * 120),
    Manual: Math.round(30 + Math.random() * 70)
  }));
};

export const generateInvoiceIngestionDrilldown2 = (parent: string) => {
  return invoiceStatuses.map(status => ({
    name: status,
    count: Math.round(200 + Math.random() * 800),
    percentage: Math.round(20 + Math.random() * 60)
  }));
};

export const generateTouchlessDrilldown1 = (filters: FilterState) => {
  const units = filters.businessUnit === 'All' ? businessUnits.slice(1) : [filters.businessUnit];
  return units.map(bu => ({
    name: bu,
    touchless: Math.round(65 + Math.random() * 25),
    manual: Math.round(35 - Math.random() * 25),
    total: Math.round(2000 + Math.random() * 3000)
  }));
};

export const generateTouchlessDrilldown2 = (parent: string) => {
  return suppliers.slice(1, 7).map(s => ({
    name: s,
    touchless: Math.round(60 + Math.random() * 30),
    manual: Math.round(40 - Math.random() * 30),
    adoptionTrend: (Math.random() * 20 - 5).toFixed(1)
  }));
};

export const generatePOCycleDrilldown1 = (filters: FilterState) => {
  return categories.map(cat => ({
    name: cat,
    avgDays: Math.round(5 + Math.random() * 8),
    target: 8,
    volume: Math.round(300 + Math.random() * 700)
  }));
};

export const generatePOCycleDrilldown2 = (parent: string) => {
  return departments.map(dept => ({
    name: dept,
    avgDays: Math.round(4 + Math.random() * 10),
    target: 8,
    efficiency: Math.round(70 + Math.random() * 25)
  }));
};

export const generateInvoiceCycleDrilldown1 = (filters: FilterState) => {
  const vendorList = filters.supplier === 'All' ? suppliers.slice(1, 8) : [filters.supplier];
  return vendorList.map(vendor => ({
    name: vendor,
    avgDays: Math.round(5 + Math.random() * 12),
    median: Math.round(4 + Math.random() * 8),
    volume: Math.round(200 + Math.random() * 800)
  }));
};

export const generateInvoiceCycleDrilldown2 = (parent: string) => {
  return [
    { name: 'Small (<$5K)', avgDays: Math.round(3 + Math.random() * 4), count: Math.round(500 + Math.random() * 500) },
    { name: 'Medium ($5K-$50K)', avgDays: Math.round(5 + Math.random() * 6), count: Math.round(300 + Math.random() * 400) },
    { name: 'Large (>$50K)', avgDays: Math.round(8 + Math.random() * 10), count: Math.round(100 + Math.random() * 200) }
  ];
};

export const generateOnTimeDrilldown1 = (filters: FilterState) => {
  const units = filters.businessUnit === 'All' ? businessUnits.slice(1) : [filters.businessUnit];
  return units.map(bu => ({
    name: bu,
    rate: Math.round(85 + Math.random() * 12),
    volume: Math.round(1500 + Math.random() * 2500)
  }));
};

export const generateOnTimeDrilldown2 = (parent: string) => {
  return suppliers.slice(1, 8).map(s => ({
    name: s,
    onTimeRate: Math.round(82 + Math.random() * 16),
    earlyRate: Math.round(5 + Math.random() * 10),
    lateRate: Math.round(3 + Math.random() * 8)
  }));
};

export const generateComplianceDrilldown1 = (filters: FilterState) => {
  return countries.slice(0, 8).map(country => ({
    name: country,
    compliance: Math.round(80 + Math.random() * 18),
    suppliers: Math.round(10 + Math.random() * 40)
  }));
};

export const generateComplianceDrilldown2 = (parent: string) => {
  return suppliers.slice(1, 9).map(s => ({
    name: s,
    compliance: Math.round(75 + Math.random() * 23),
    violations: Math.round(Math.random() * 5),
    score: Math.round(80 + Math.random() * 18)
  }));
};

export const generateExceptionsDrilldown1 = (filters: FilterState) => {
  const units = filters.businessUnit === 'All' ? businessUnits.slice(1) : [filters.businessUnit];
  return units.map(bu => ({
    name: bu,
    priceMismatch: Math.round(30 + Math.random() * 50),
    missingPO: Math.round(25 + Math.random() * 40),
    qtyVariance: Math.round(20 + Math.random() * 35),
    taxError: Math.round(10 + Math.random() * 20),
    other: Math.round(8 + Math.random() * 15)
  }));
};

export const generateExceptionsDrilldown2 = (parent: string) => {
  return suppliers.slice(1, 8).map(s => ({
    name: s,
    totalExceptions: Math.round(10 + Math.random() * 90),
    exceptionRate: (Math.random() * 8).toFixed(1),
    trend: (Math.random() * 10 - 5).toFixed(1)
  }));
};

export const generateSavingsDrilldown1 = (filters: FilterState) => {
  return categories.map(cat => ({
    name: cat,
    opportunities: Math.round(5000000 + Math.random() * 15000000),
    negotiated: Math.round(3500000 + Math.random() * 10000000),
    realized: Math.round(2500000 + Math.random() * 7000000)
  }));
};

export const generateSavingsDrilldown2 = (parent: string) => {
  return suppliers.slice(1, 7).map(s => ({
    name: s,
    contribution: Math.round(500000 + Math.random() * 4500000),
    percentage: (Math.random() * 25).toFixed(1),
    ytd: Math.round(400000 + Math.random() * 3500000)
  }));
};

export const generateWorkingCapitalDrilldown1 = (filters: FilterState) => {
  const regionList = filters.region === 'All' ? regions.slice(1, 7) : [filters.region];
  return regionList.map(region => ({
    name: region,
    dpoChange: Math.round(8 + Math.random() * 12),
    cashImpact: Math.round(1000000 + Math.random() * 9000000),
    improvement: (Math.random() * 30).toFixed(1)
  }));
};

export const generateWorkingCapitalDrilldown2 = (parent: string) => {
  const units = businessUnits.slice(1, 5);
  return units.map(bu => ({
    name: bu,
    dpoStart: Math.round(38 + Math.random() * 10),
    dpoEnd: Math.round(48 + Math.random() * 15),
    cashEffect: Math.round(500000 + Math.random() * 4500000)
  }));
};

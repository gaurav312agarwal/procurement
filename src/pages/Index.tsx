import { useState } from "react";
import { FilterPanel } from "@/components/FilterPanel";
import { KPICard } from "@/components/KPICard";
import { GaugeChart } from "@/components/charts/GaugeChart";
import { DonutChart } from "@/components/charts/DonutChart";
import { BarChart } from "@/components/charts/BarChart";
import { LineChart } from "@/components/charts/LineChart";
import { HeatmapChart } from "@/components/charts/HeatmapChart";
import { DrilldownModal } from "@/components/DrilldownModal";
import { ChartCard } from "@/components/ChartCard";
import {
  FilterState,
  generateKPIData,
  generateInvoiceIngestionData,
  generatePOCycleTimeData,
  generateInvoiceCycleTimeData,
  generateOnTimePaymentData,
  generateSupplierComplianceData,
  generateInvoiceExceptionsData,
  generateCostSavingsData,
  generateWorkingCapitalData,
  generateEarlyPayDrilldown1,
  generateEarlyPayDrilldown2,
  generateAnnualizedReturnDrilldown1,
  generateAnnualizedReturnDrilldown2,
  generateInvoiceIngestionDrilldown1,
  generateInvoiceIngestionDrilldown2,
  generateTouchlessDrilldown1,
  generateTouchlessDrilldown2,
  generatePOCycleDrilldown1,
  generatePOCycleDrilldown2,
  generateInvoiceCycleDrilldown1,
  generateInvoiceCycleDrilldown2,
  generateOnTimeDrilldown1,
  generateOnTimeDrilldown2,
  generateComplianceDrilldown1,
  generateComplianceDrilldown2,
  generateExceptionsDrilldown1,
  generateExceptionsDrilldown2,
  generateSavingsDrilldown1,
  generateSavingsDrilldown2,
  generateWorkingCapitalDrilldown1,
  generateWorkingCapitalDrilldown2
} from "@/lib/mockData";
import { DollarSign, TrendingUp, Zap, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: 'Last 30 Days',
    businessUnit: 'All',
    region: 'All',
    supplier: 'All',
    invoiceType: 'All'
  });

  const [activeSection, setActiveSection] = useState<string>('financial');

  const [drilldown, setDrilldown] = useState<{
    open: boolean;
    title: string;
    metric: string;
    level: number;
    data: any[];
    maxLevel: number;
    parent?: string;
  }>({
    open: false,
    title: '',
    metric: '',
    level: 1,
    data: [],
    maxLevel: 2,
    parent: undefined
  });

  const kpiData = generateKPIData(filters);
  const invoiceIngestionData = generateInvoiceIngestionData(filters);
  const poCycleTimeData = generatePOCycleTimeData(filters);
  const invoiceCycleTimeData = generateInvoiceCycleTimeData(filters);
  const onTimePaymentData = generateOnTimePaymentData(filters);
  const supplierComplianceData = generateSupplierComplianceData(filters);
  const invoiceExceptionsData = generateInvoiceExceptionsData(filters);
  const costSavingsData = generateCostSavingsData(filters);
  const workingCapitalData = generateWorkingCapitalData(filters);

  const getDrilldownData = (metric: string, level: number, parent?: string) => {
    const drilldownMap: Record<string, any> = {
      'earlyPay-1': () => generateEarlyPayDrilldown1(filters),
      'earlyPay-2': () => generateEarlyPayDrilldown2(parent || ''),
      'annualReturn-1': () => generateAnnualizedReturnDrilldown1(filters),
      'annualReturn-2': () => generateAnnualizedReturnDrilldown2(parent || ''),
      'invoiceIngestion-1': () => generateInvoiceIngestionDrilldown1(filters),
      'invoiceIngestion-2': () => generateInvoiceIngestionDrilldown2(parent || ''),
      'touchless-1': () => generateTouchlessDrilldown1(filters),
      'touchless-2': () => generateTouchlessDrilldown2(parent || ''),
      'poCycle-1': () => generatePOCycleDrilldown1(filters),
      'poCycle-2': () => generatePOCycleDrilldown2(parent || ''),
      'invoiceCycle-1': () => generateInvoiceCycleDrilldown1(filters),
      'invoiceCycle-2': () => generateInvoiceCycleDrilldown2(parent || ''),
      'onTime-1': () => generateOnTimeDrilldown1(filters),
      'onTime-2': () => generateOnTimeDrilldown2(parent || ''),
      'compliance-1': () => generateComplianceDrilldown1(filters),
      'compliance-2': () => generateComplianceDrilldown2(parent || ''),
      'exceptions-1': () => generateExceptionsDrilldown1(filters),
      'exceptions-2': () => generateExceptionsDrilldown2(parent || ''),
      'savings-1': () => generateSavingsDrilldown1(filters),
      'savings-2': () => generateSavingsDrilldown2(parent || ''),
      'workingCapital-1': () => generateWorkingCapitalDrilldown1(filters),
      'workingCapital-2': () => generateWorkingCapitalDrilldown2(parent || '')
    };

    const key = `${metric}-${level}`;
    return drilldownMap[key] ? drilldownMap[key]() : [];
  };

  const handleDrilldown = (metric: string, title: string, level: number = 1, parent?: string) => {
    const data = getDrilldownData(metric, level, parent);
    setDrilldown({ 
      open: true, 
      title, 
      metric, 
      level, 
      data,
      maxLevel: 2,
      parent 
    });
  };

  const handleNextLevel = (selectedItem: string) => {
    if (drilldown.level < drilldown.maxLevel) {
      const nextData = getDrilldownData(drilldown.metric, drilldown.level + 1, selectedItem);
      setDrilldown({
        ...drilldown,
        level: drilldown.level + 1,
        data: nextData,
        parent: selectedItem
      });
    }
  };

  const handleCloseDrilldown = () => {
    setDrilldown({ ...drilldown, open: false });
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-[1920px] mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-foreground mb-2 bg-gradient-to-r from-neon-cyan via-neon-green to-neon-purple bg-clip-text text-transparent">
              Procure-to-Pay Dashboard
            </h1>
            <p className="text-muted-foreground">
              Real-time insights into procurement performance and payment operations
            </p>
          </div>
          <a href="https://portfolio.epitomeminds.com/" className="ml-auto">
            <Button variant="outline" size="sm">← Back</Button>
          </a>
        </header>

        <FilterPanel filters={filters} onFilterChange={setFilters} />

        {/* Section Navigation */}
        <div className="mb-6 flex gap-3 overflow-x-auto pb-2">
          <Button
            onClick={() => scrollToSection('financial')}
            variant={activeSection === 'financial' ? 'default' : 'outline'}
            className={`flex items-center gap-2 ${
              activeSection === 'financial' 
                ? 'neon-glow-cyan bg-neon-cyan/20 border-neon-cyan text-neon-cyan' 
                : 'border-border hover:border-neon-cyan/50'
            }`}
          >
            <DollarSign className="h-4 w-4" />
            Financial Strategy
          </Button>
          <Button
            onClick={() => scrollToSection('efficiency')}
            variant={activeSection === 'efficiency' ? 'default' : 'outline'}
            className={`flex items-center gap-2 ${
              activeSection === 'efficiency' 
                ? 'neon-glow-yellow bg-neon-yellow/20 border-neon-yellow text-neon-yellow' 
                : 'border-border hover:border-neon-yellow/50'
            }`}
          >
            <Zap className="h-4 w-4" />
            Efficiency & Cycle Time
          </Button>
          <Button
            onClick={() => scrollToSection('compliance')}
            variant={activeSection === 'compliance' ? 'default' : 'outline'}
            className={`flex items-center gap-2 ${
              activeSection === 'compliance' 
                ? 'neon-glow-orange bg-neon-orange/20 border-neon-orange text-neon-orange' 
                : 'border-border hover:border-neon-orange/50'
            }`}
          >
            <Shield className="h-4 w-4" />
            Compliance & Risk
          </Button>
          <Button
            onClick={() => scrollToSection('supplier')}
            variant={activeSection === 'supplier' ? 'default' : 'outline'}
            className={`flex items-center gap-2 ${
              activeSection === 'supplier' 
                ? 'neon-glow-green bg-neon-green/20 border-neon-green text-neon-green' 
                : 'border-border hover:border-neon-green/50'
            }`}
          >
            <Users className="h-4 w-4" />
            Supplier Performance
          </Button>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPICard
            title="Early Pay Discount Rate"
            value={kpiData.earlyPayDiscountRate.current}
            unit="%"
            target={kpiData.earlyPayDiscountRate.target}
            trend={parseFloat(kpiData.earlyPayDiscountRate.trend)}
            status={kpiData.earlyPayDiscountRate.current >= 70 ? 'positive' : 'negative'}
            onClick={() => handleDrilldown('earlyPay', 'Early Pay Discount Rate', 1)}
          />
          <KPICard
            title="Annualized ROI"
            value={kpiData.annualizedReturn.returnRate}
            unit="%"
            subtitle={`vs ${kpiData.annualizedReturn.costOfCapital}% cost of capital`}
            status="positive"
            onClick={() => handleDrilldown('annualReturn', 'Annualized Return', 1)}
          />
          <KPICard
            title="Touchless Invoice Rate"
            value={kpiData.touchlessInvoiceRate.touchless}
            unit="%"
            subtitle={`${kpiData.touchlessInvoiceRate.manual}% manual processing`}
            status={kpiData.touchlessInvoiceRate.touchless >= 70 ? 'positive' : 'neutral'}
            onClick={() => handleDrilldown('touchless', 'Touchless Invoice Rate', 1)}
          />
          <KPICard
            title="On-Time Payment Rate"
            value={kpiData.onTimePaymentRate.rate}
            unit="%"
            trend={parseFloat(kpiData.onTimePaymentRate.trend)}
            subtitle={`${kpiData.onTimePaymentRate.volume.toLocaleString()} invoices`}
            status="positive"
            onClick={() => handleDrilldown('onTime', 'On-Time Payment Rate', 1)}
          />
        </div>

        {/* Section 1: Financial Strategy & Working Capital */}
        <div id="financial" className="mb-8 scroll-mt-6">
          <h2 className="text-2xl font-bold mb-4 text-foreground border-l-4 border-neon-cyan pl-4 flex items-center gap-3">
            <DollarSign className="h-6 w-6 text-neon-cyan" />
            Financial Strategy & Working Capital
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard
              title="Early Pay Discount Capture"
              onDrilldown={() => handleDrilldown('earlyPay', 'Early Pay Discount Capture', 1)}
              drilldownLevels={2}
              glowColor="green"
            >
              <GaugeChart
                title=""
                value={kpiData.earlyPayDiscountRate.current}
                target={kpiData.earlyPayDiscountRate.target}
              />
            </ChartCard>

            <div className="dashboard-card neon-border-cyan">
              <div className="dashboard-card-header flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-neon-cyan" />
                Annualized Return on Early Payment
              </div>
              <div className="grid grid-cols-2 gap-6 mt-4">
                <div className="text-center p-6 bg-secondary/50 rounded-lg border border-neon-green/30">
                  <div className="text-sm text-muted-foreground mb-2">Return Rate</div>
                  <div className="text-4xl font-bold text-neon-green">
                    {kpiData.annualizedReturn.returnRate}%
                  </div>
                </div>
                <div className="text-center p-6 bg-secondary/50 rounded-lg border border-neon-orange/30">
                  <div className="text-sm text-muted-foreground mb-2">Cost of Capital</div>
                  <div className="text-4xl font-bold text-neon-orange">
                    {kpiData.annualizedReturn.costOfCapital}%
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-neon-green/10 border border-neon-green/30 rounded-lg neon-glow-green">
                <div className="flex items-center gap-2 text-neon-green">
                  <TrendingUp className="h-5 w-5" />
                  <span className="font-semibold">Net Benefit: {kpiData.annualizedReturn.netBenefit}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Efficiency & Cycle Time */}
        <div id="efficiency" className="mb-8 scroll-mt-6">
          <h2 className="text-2xl font-bold mb-4 text-foreground border-l-4 border-neon-yellow pl-4">
            Efficiency & Cycle Time (Speed of the Process)
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ChartCard
              title="Invoice Ingestion Method"
              onDrilldown={() => handleDrilldown('invoiceIngestion', 'Invoice Ingestion Method', 1)}
              drilldownLevels={2}
              glowColor="purple"
            >
              <BarChart
                title=""
                data={invoiceIngestionData}
                dataKeys={[
                  { key: 'count', color: 'hsl(var(--neon-cyan))', name: 'Invoices' }
                ]}
                xAxisKey="method"
              />
            </ChartCard>

            <ChartCard
              title="Touchless vs Manual Invoices"
              onDrilldown={() => handleDrilldown('touchless', 'Touchless Invoice Rate', 1)}
              drilldownLevels={2}
              glowColor="green"
            >
              <DonutChart
                title=""
                data={[
                  { name: 'Touchless', value: kpiData.touchlessInvoiceRate.touchless, color: 'hsl(var(--neon-green))' },
                  { name: 'Manual', value: kpiData.touchlessInvoiceRate.manual, color: 'hsl(var(--neon-orange))' }
                ]}
              />
            </ChartCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard
              title="PO Cycle Time (Req → PO)"
              onDrilldown={() => handleDrilldown('poCycle', 'PO Cycle Time', 1)}
              drilldownLevels={2}
              glowColor="yellow"
            >
              <LineChart
                title=""
                data={poCycleTimeData}
                dataKeys={[
                  { key: 'avgDays', color: 'hsl(var(--neon-yellow))', name: 'Avg Days' },
                  { key: 'target', color: 'hsl(var(--neon-orange))', name: 'Target' }
                ]}
                xAxisKey="month"
              />
            </ChartCard>

            <ChartCard
              title="Invoice Processing Time (Receipt → Payment)"
              onDrilldown={() => handleDrilldown('invoiceCycle', 'Invoice Cycle Time', 1)}
              drilldownLevels={2}
              glowColor="cyan"
            >
              <BarChart
                title=""
                data={invoiceCycleTimeData.slice(0, 15)}
                dataKeys={[
                  { key: 'days', color: 'hsl(var(--neon-cyan))', name: 'Days' }
                ]}
                xAxisKey="invoiceId"
              />
            </ChartCard>
          </div>
        </div>

        {/* Section 3: Compliance & Risk */}
        <div id="compliance" className="mb-8 scroll-mt-6">
          <h2 className="text-2xl font-bold mb-4 text-foreground border-l-4 border-neon-orange pl-4">
            Compliance & Risk (Focus on Accuracy and Control)
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ChartCard
              title="Invoice Exceptions by Reason"
              onDrilldown={() => handleDrilldown('exceptions', 'Invoice Exceptions', 1)}
              drilldownLevels={2}
              glowColor="purple"
            >
              <BarChart
                title=""
                data={invoiceExceptionsData}
                dataKeys={[
                  { key: 'count', color: 'hsl(var(--neon-purple))', name: 'Exceptions' }
                ]}
                xAxisKey="reason"
              />
            </ChartCard>

            <ChartCard
              title="On-Time Payment Rate"
              onDrilldown={() => handleDrilldown('onTime', 'On-Time Payment Rate', 1)}
              drilldownLevels={2}
              glowColor="cyan"
            >
              <BarChart
                title=""
                data={onTimePaymentData}
                dataKeys={[
                  { key: 'rate', color: 'hsl(var(--neon-cyan))', name: 'On-Time %' },
                  { key: 'volume', color: 'hsl(var(--neon-purple))', name: 'Volume' }
                ]}
                xAxisKey="month"
              />
            </ChartCard>

            <ChartCard
              title="Working Capital Impact (DPO)"
              onDrilldown={() => handleDrilldown('workingCapital', 'Working Capital Impact', 1)}
              drilldownLevels={2}
              glowColor="cyan"
            >
              <BarChart
                title=""
                data={workingCapitalData}
                dataKeys={[
                  { key: 'value', color: 'hsl(var(--neon-cyan))', name: 'Days' }
                ]}
                xAxisKey="category"
              />
            </ChartCard>
          </div>
        </div>

        {/* Section 4: Supplier Performance & Risk */}
        <div id="supplier" className="mb-8 scroll-mt-6">
          <h2 className="text-2xl font-bold mb-4 text-foreground border-l-4 border-neon-green pl-4">
            Supplier Performance & Risk
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard
              title="Supplier Compliance by Region"
              onDrilldown={() => handleDrilldown('compliance', 'Supplier Compliance', 1)}
              drilldownLevels={2}
              glowColor="green"
            >
              <HeatmapChart
                title=""
                data={supplierComplianceData}
              />
            </ChartCard>

            <ChartCard
              title="Cost Savings Funnel"
              onDrilldown={() => handleDrilldown('savings', 'Cost Savings', 1)}
              drilldownLevels={2}
              glowColor="green"
            >
              <BarChart
                title=""
                data={costSavingsData}
                dataKeys={[
                  { key: 'displayValue', color: 'hsl(var(--neon-green))', name: 'Savings ($M)' }
                ]}
                xAxisKey="stage"
              />
            </ChartCard>
          </div>
        </div>
      </div>

      <DrilldownModal
        open={drilldown.open}
        onClose={handleCloseDrilldown}
        title={drilldown.title}
        data={drilldown.data}
        level={drilldown.level}
        maxLevel={drilldown.maxLevel}
        onNextLevel={handleNextLevel}
      />
    </div>
  );
};

export default Index;

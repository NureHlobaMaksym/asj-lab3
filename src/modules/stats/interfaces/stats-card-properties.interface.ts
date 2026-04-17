export interface StatsCardProperties {
    count: number;
    label: string;
    variant: 'active' | 'done' | 'overdue' | 'default';
}
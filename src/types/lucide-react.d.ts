declare module 'lucide-react' {
  import * as React from 'react';
  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
    absoluteStrokeWidth?: boolean;
    className?: string;
    children?: React.ReactNode;
  }
  export type Icon = React.ForwardRefExoticComponent<
    LucideProps & React.RefAttributes<SVGSVGElement>
  >;
  export const BookOpen: Icon;
  export const Flame: Icon;
  export const GraduationCap: Icon;
  export const ShieldCheck: Icon;
  export const Code2: Icon;
  export const Sparkles: Icon;
  export const Search: Icon;
  export const Upload: Icon;
  export const Download: Icon;
  export const CheckCircle2: Icon;
  export const CheckCircle: Icon;
  export const Check: Icon;
  export const Circle: Icon;
  export const ChevronDown: Icon;
  export const LayoutDashboard: Icon;
  export const ArrowRight: Icon;
  export const ArrowUpRight: Icon;
  export const Star: Icon;
  export const Lock: Icon;
  export const Tag: Icon;
  export const Eye: Icon;
  export const X: Icon;
  export const XCircle: Icon;
  export const CreditCard: Icon;
  export const Plus: Icon;
  export const Trash2: Icon;
  export const Trophy: Icon;
  export const Clock: Icon;
  export const Calendar: Icon;
  export const FileText: Icon;
  export const AlertCircle: Icon;
  export const IndianRupee: Icon;
  export const Users: Icon;
  export const Award: Icon;
  export const GitBranch: Icon;
  export const Github: Icon;
  export const Heart: Icon;
  export const Shield: Icon;
  export const FolderGit2: Icon;
  export const Filter: Icon;
  export const ExternalLink: Icon;
  const icons: Record<string, Icon>;
  export default icons;
}

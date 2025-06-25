
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface InfoSectionProps {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
  className?: string;
}

const InfoSection = ({ title, icon: Icon, children, className = "" }: InfoSectionProps) => {
  return (
    <section className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="text-gray-700 leading-relaxed">
        {children}
      </div>
    </section>
  );
};

export default InfoSection;

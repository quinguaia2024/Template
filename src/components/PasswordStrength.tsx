import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PasswordStrengthProps {
  password: string;
  className?: string;
}

interface RequirementProps {
  met: boolean;
  text: string;
}

const Requirement = ({ met, text }: RequirementProps) => (
  <motion.div
    className={cn(
      "flex items-center gap-2 text-sm transition-colors",
      met ? "text-emerald-500" : "text-muted-foreground"
    )}
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
  >
    {met ? (
      <Check className="w-3 h-3" />
    ) : (
      <X className="w-3 h-3 text-destructive" />
    )}
    <span>{text}</span>
  </motion.div>
);

export const PasswordStrength = ({ password, className }: PasswordStrengthProps) => {
  const requirements = [
    { met: password.length >= 12, text: "Mínimo 12 caracteres" },
    { met: /[A-Z]/.test(password), text: "Maiúsculas (A-Z)" },
    { met: /[a-z]/.test(password), text: "Minúsculas (a-z)" },
    { met: /\d/.test(password), text: "Números (0-9)" },
    { met: /[!@#$%^&*(),.?":{}|<>]/.test(password), text: "Símbolos (!@#$%^&*)" },
  ];

  const metCount = requirements.filter(req => req.met).length;
  const strength = metCount === 0 ? 0 : metCount <= 2 ? 1 : metCount <= 4 ? 2 : 3;
  
  const strengthConfig = {
    0: { label: "", color: "bg-muted", width: "0%" },
    1: { label: "Fraca", color: "bg-destructive", width: "33%" },
    2: { label: "Média", color: "bg-amber-500", width: "66%" },
    3: { label: "Forte", color: "bg-emerald-500", width: "100%" },
  };

  const config = strengthConfig[strength];

  return (
    <div className={cn("space-y-4", className)}>
      {/* Barra de força */}
      {password && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Força:</span>
            <span className={cn(
              "text-sm font-medium",
              strength === 1 && "text-destructive",
              strength === 2 && "text-amber-500",
              strength === 3 && "text-emerald-500"
            )}>
              {config.label}
            </span>
          </div>
          
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className={cn("h-full transition-all duration-300", config.color)}
              initial={{ width: "0%" }}
              animate={{ width: config.width }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      {/* Requisitos */}
      {password && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground mb-3">Requisitos:</p>
          <div className="space-y-1">
            {requirements.map((req, index) => (
              <Requirement key={index} met={req.met} text={req.text} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
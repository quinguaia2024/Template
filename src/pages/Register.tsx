import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, GraduationCap, Users, BookOpen, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { PasswordStrength } from '@/components/PasswordStrength';
import { UserRole } from '@/types/auth';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const roleData = {
  Aluno: {
    icon: GraduationCap,
    title: "ALUNO",
    description: "Aprender com conteúdo personalizado pela IA",
    color: "text-primary"
  },
  Tutor: {
    icon: Users,
    title: "TUTOR",
    description: "Monitorar progresso de alunos",
    color: "text-secondary"
  },
  Professor: {
    icon: BookOpen,
    title: "PROFESSOR",
    description: "Fornecer materiais e acompanhar turmas",
    color: "text-accent"
  }
};

const step1Schema = z.object({
  role: z.enum(['Aluno', 'Tutor', 'Professor'], { 
    required_error: "Selecione seu papel" 
  })
});

const step2Schema = z.object({
  name: z.string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome muito longo"),
  email: z.string()
    .email("Email inválido")
    .max(255, "Email muito longo"),
  dateOfBirth: z.string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Use o formato DD/MM/YYYY"),
  country: z.string().min(1, "Selecione o país")
});

const step3Schema = z.object({
  password: z.string()
    .min(12, "Senha deve ter pelo menos 12 caracteres")
    .regex(/[A-Z]/, "Senha deve conter pelo menos uma maiúscula")
    .regex(/[a-z]/, "Senha deve conter pelo menos uma minúscula")
    .regex(/\d/, "Senha deve conter pelo menos um número")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Senha deve conter pelo menos um símbolo"),
  confirmPassword: z.string(),
  agreedToTerms: z.boolean().refine(val => val === true, {
    message: "Você deve concordar com os termos"
  })
}).refine(data => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"]
});

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { register } = useAuth();

  const getCurrentSchema = () => {
    switch (currentStep) {
      case 1: return step1Schema;
      case 2: return step2Schema;
      case 3: return step3Schema;
      default: return step1Schema;
    }
  };

  const form = useForm({
    resolver: zodResolver(getCurrentSchema()),
    mode: 'onChange'
  });

  const progress = (currentStep / 3) * 100;

  const nextStep = async (data: any) => {
    setFormData(prev => ({ ...prev, ...data }));
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
      form.reset();
    } else {
      await handleSubmit(data);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      form.reset();
    }
  };

  const handleSubmit = async (step3Data: any) => {
    setIsLoading(true);
    try {
      const completeData = { ...formData, ...step3Data };
      await register({
        role: completeData.role,
        name: completeData.name,
        email: completeData.email,
        dateOfBirth: completeData.dateOfBirth,
        country: completeData.country,
        password: completeData.password
      });
      
      // Mostrar modal de sucesso
      toast({
        title: "Conta criada com sucesso!",
        description: `Bem-vindo ao Mentor IA, ${completeData.name}!`,
      });
      
      // Redirecionar para dashboard após pequeno delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (error) {
      console.error('Erro no cadastro:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Fundo geométrico */}
      <div className="absolute inset-0 geometric-bg opacity-20" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => currentStep === 1 ? navigate('/auth') : prevStep()}
            className="text-foreground/70 hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Passo {currentStep} de 3
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto mb-8">
          <Progress value={progress} className="h-2" />
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="glass-card">
            <CardContent className="p-8">
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(nextStep)}>
                  
                  <AnimatePresence mode="wait">
                    
                    {/* Passo 1: Seleção de Papel */}
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        variants={stepVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="space-y-6"
                      >
                        <div className="text-center mb-8">
                          <h2 className="text-2xl font-bold text-foreground mb-2">
                            Qual é o seu papel?
                          </h2>
                          <p className="text-muted-foreground">
                            Selecione para personalizar sua experiência
                          </p>
                        </div>

                        <FormField
                          control={form.control}
                          name="role"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="grid md:grid-cols-3 gap-4">
                                  {(Object.keys(roleData) as UserRole[]).map((role) => {
                                    const { icon: Icon, title, description, color } = roleData[role];
                                    const isSelected = field.value === role;
                                    
                                    return (
                                      <motion.div
                                        key={role}
                                        whileHover={{ scale: 1.02, y: -4 }}
                                        whileTap={{ scale: 0.98 }}
                                      >
                                        <Card
                                          className={`cursor-pointer transition-all hover-scale ${
                                            isSelected 
                                              ? 'ring-2 ring-primary bg-primary/5' 
                                              : 'hover:border-primary/50'
                                          }`}
                                          onClick={() => field.onChange(role)}
                                        >
                                          <CardContent className="p-6 text-center">
                                            <Icon className={`w-12 h-12 mx-auto mb-4 ${color}`} />
                                            <h3 className="font-semibold mb-2">{title}</h3>
                                            <p className="text-sm text-muted-foreground">
                                              {description}
                                            </p>
                                          </CardContent>
                                        </Card>
                                      </motion.div>
                                    );
                                  })}
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex justify-end pt-6">
                          <Button 
                            type="submit"
                            disabled={!form.watch('role')}
                            className="btn-wave"
                          >
                            Próximo
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {/* Passo 2: Dados Pessoais */}
                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        variants={stepVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="space-y-6"
                      >
                        <div className="text-center mb-8">
                          <h2 className="text-2xl font-bold text-foreground mb-2">
                            Dados Pessoais
                          </h2>
                          <p className="text-muted-foreground">
                            Preencha as informações básicas
                          </p>
                        </div>

                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nome Completo</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Seu nome completo"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="email"
                                    placeholder="seu@email.com"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="dateOfBirth"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Data de Nascimento</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="DD/MM/YYYY"
                                    {...field}
                                    onChange={(e) => {
                                      let value = e.target.value.replace(/\D/g, '');
                                      if (value.length >= 2) {
                                        value = value.slice(0, 2) + '/' + value.slice(2);
                                      }
                                      if (value.length >= 5) {
                                        value = value.slice(0, 5) + '/' + value.slice(5, 9);
                                      }
                                      field.onChange(value);
                                    }}
                                    maxLength={10}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>País/Região</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecione seu país" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="angola">Angola</SelectItem>
                                    <SelectItem value="brasil">Brasil</SelectItem>
                                    <SelectItem value="portugal">Portugal</SelectItem>
                                    <SelectItem value="mocambique">Moçambique</SelectItem>
                                    <SelectItem value="outro">Outro</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="flex justify-between pt-6">
                          <Button 
                            type="button"
                            variant="outline"
                            onClick={prevStep}
                          >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Anterior
                          </Button>
                          
                          <Button 
                            type="submit"
                            className="btn-wave"
                          >
                            Próximo
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {/* Passo 3: Credenciais */}
                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        variants={stepVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="space-y-6"
                      >
                        <div className="text-center mb-8">
                          <h2 className="text-2xl font-bold text-foreground mb-2">
                            Crie sua Senha
                          </h2>
                          <p className="text-muted-foreground">
                            Escolha uma senha forte e segura
                          </p>
                        </div>

                        <div className="space-y-6">
                          <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input 
                                      type={showPassword ? "text" : "password"}
                                      placeholder="Crie uma senha forte"
                                      {...field}
                                    />
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 px-2 text-xs"
                                      onClick={() => setShowPassword(!showPassword)}
                                    >
                                      {showPassword ? "Ocultar" : "Mostrar"}
                                    </Button>
                                  </div>
                                </FormControl>
                                <FormMessage />
                                
                                {field.value && (
                                  <PasswordStrength password={field.value} />
                                )}
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Confirmar Senha</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input 
                                      type={showConfirmPassword ? "text" : "password"}
                                      placeholder="Confirme sua senha"
                                      {...field}
                                    />
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 px-2 text-xs"
                                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                      {showConfirmPassword ? "Ocultar" : "Mostrar"}
                                    </Button>
                                  </div>
                                </FormControl>
                                <FormMessage />
                                
                                {field.value && form.watch('password') === field.value && (
                                  <div className="flex items-center gap-2 text-sm text-emerald-500">
                                    <Check className="w-3 h-3" />
                                    <span>Senhas coincidem</span>
                                  </div>
                                )}
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="agreedToTerms"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="text-sm">
                                    Concordo com os{" "}
                                    <a href="/terms" className="underline hover:text-primary">
                                      Termos de Serviço
                                    </a>{" "}
                                    e{" "}
                                    <a href="/privacy" className="underline hover:text-primary">
                                      Política de Privacidade
                                    </a>
                                  </FormLabel>
                                  <FormMessage />
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="flex justify-between pt-6">
                          <Button 
                            type="button"
                            variant="outline"
                            onClick={prevStep}
                            disabled={isLoading}
                          >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Anterior
                          </Button>
                          
                          <Button 
                            type="submit"
                            disabled={isLoading || !form.watch('agreedToTerms')}
                            className="btn-wave"
                          >
                            {isLoading ? "Criando conta..." : "CRIAR CONTA"}
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
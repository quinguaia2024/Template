import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/auth/context/AuthContext';

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha obrigatória"),
  rememberMe: z.boolean().default(false)
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Email inválido")
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false);
  
  const navigate = useNavigate();
  const { login, resetPassword } = useAuth();

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });

  const forgotForm = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ""
    }
  });

  const handleLogin = async (data: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password, data.rememberMe);
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro no login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (data: z.infer<typeof forgotPasswordSchema>) => {
    try {
      await resetPassword(data.email);
      setForgotPasswordSent(true);
    } catch (error) {
      console.error('Erro ao enviar email:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Fundo com animação de partículas */}
      <div className="absolute inset-0">
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.circle
              key={i}
              cx={Math.random() * 1200}
              cy={Math.random() * 800}
              r="2"
              fill="hsl(var(--primary))"
              fillOpacity="0.3"
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        
        {/* Botão voltar */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/auth')}
            className="text-foreground/70 hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>

        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass-card">
              <CardContent className="p-8">
                
                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    Bem-vindo de Volta!
                  </h1>
                  <p className="text-muted-foreground">
                    Faça login para continuar sua jornada
                  </p>
                </div>

                {/* Formulário de Login */}
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-6">
                    
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input 
                                type="email"
                                placeholder="seu@email.com"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input 
                                type={showPassword ? "text" : "password"}
                                placeholder="Sua senha"
                                className="pl-10 pr-10"
                                {...field}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Link Esqueceu a senha */}
                    <div className="text-right">
                      <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="link" 
                            className="p-0 h-auto text-sm text-primary hover:underline"
                          >
                            Esqueceu a senha?
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="glass-card">
                          <DialogHeader>
                            <DialogTitle>Recuperar Senha</DialogTitle>
                            <DialogDescription>
                              Insira seu email para receber instruções de recuperação
                            </DialogDescription>
                          </DialogHeader>
                          
                          {!forgotPasswordSent ? (
                            <Form {...forgotForm}>
                              <form onSubmit={forgotForm.handleSubmit(handleForgotPassword)} className="space-y-4">
                                <FormField
                                  control={forgotForm.control}
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
                                
                                <div className="flex justify-end gap-2">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setShowForgotPassword(false)}
                                  >
                                    Cancelar
                                  </Button>
                                  <Button type="submit">
                                    Enviar Link
                                  </Button>
                                </div>
                              </form>
                            </Form>
                          ) : (
                            <div className="text-center py-4">
                              <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="w-8 h-8 text-emerald-500" />
                              </div>
                              <p className="text-emerald-500 font-medium mb-2">
                                Email enviado!
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Verifique sua caixa de entrada para redefinir sua senha
                              </p>
                              <Button
                                className="mt-4"
                                onClick={() => {
                                  setShowForgotPassword(false);
                                  setForgotPasswordSent(false);
                                  forgotForm.reset();
                                }}
                              >
                                Fechar
                              </Button>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>

                    {/* Checkbox Manter conectado */}
                    <FormField
                      control={loginForm.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            Manter-me conectado
                          </FormLabel>
                        </FormItem>
                      )}
                    />

                    {/* Botão Entrar */}
                    <Button 
                      type="submit"
                      className="w-full btn-wave"
                      disabled={isLoading}
                    >
                      {isLoading ? "Entrando..." : "ENTRAR"}
                    </Button>
                  </form>
                </Form>

                {/* Link para cadastro */}
                <div className="text-center mt-6">
                  <p className="text-sm text-muted-foreground">
                    Não tem conta?{" "}
                    <Link 
                      to="/register" 
                      className="text-primary hover:underline font-medium"
                    >
                      Cadastre-se aqui
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;

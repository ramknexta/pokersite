import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits" }),
  city: z.string().min(2, { message: "City is required" }),
});

interface RegistrationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function RegistrationDialog({
                                     isOpen,
                                     onClose,
                                     onSuccess,
                                   }: RegistrationDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      city: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // Prepare form data
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("city", values.city);

      // Send data to Google Apps Script endpoint
      const response = await fetch(
          "https://script.google.com/macros/s/AKfycbzURFBeXIDI57wTTTlPIBufmamhbipBafEO7LhnSbwjJqjeR5G1sdkEjy_O0JcOVtAe/exec",
          {
            method: "POST",
            body: formData,
          }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Store user data in localStorage
      localStorage.setItem("userData", JSON.stringify(values));

      toast({
        title: "Registration successful",
        description: "Welcome to Poker Club Hub!",
      });

      onSuccess();
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[425px] bg-white/95 backdrop-blur-xl border-gray-200/70">
          <DialogHeader>
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex justify-center mb-4"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">♠</span>
              </div>
            </motion.div>
            <DialogTitle className="text-2xl font-bold text-center text-gray-800">
              Welcome to Poker Club Hub
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600">
              Please register to access our poker club directory
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Full Name</FormLabel>
                        <FormControl>
                          <Input
                              placeholder="Enter your full name"
                              {...field}
                              className="bg-white/80 border-gray-300 text-gray-800 placeholder:text-gray-400"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                  )}
              />

              <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Email</FormLabel>
                        <FormControl>
                          <Input
                              placeholder="Enter your email"
                              type="email"
                              {...field}
                              className="bg-white/80 border-gray-300 text-gray-800 placeholder:text-gray-400"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                  )}
              />

              <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Phone Number</FormLabel>
                        <FormControl>
                          <Input
                              placeholder="Enter your phone number"
                              type="tel"
                              {...field}
                              className="bg-white/80 border-gray-300 text-gray-800 placeholder:text-gray-400 "
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                  )}
              />

              <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">City</FormLabel>
                        <FormControl>
                          <Input
                              placeholder="Enter your city"
                              {...field}
                              className="bg-white/80 border-gray-300 text-gray-800 placeholder:text-gray-400 "
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                  )}
              />

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    className="border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </Button>
                <Button
                    type="submit"
                    className="bg-gradient-to-r from-fuchsia-500 to-indigo-500 hover:from-fuchsia-600 hover:to-indigo-600 text-white shadow-md"
                    disabled={isSubmitting}
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
  );
}
import { useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Building,
  MapPin,
  Clock,
  Image,
  Plus,
  DollarSign,
  Calendar,
  ArrowLeft,
} from "lucide-react";
import { useLoading } from "@/contexts/LoadingContext";
import { motion } from "framer-motion";

const formSchema = z.object({
  name: z
      .string()
      .min(2, { message: "Club name must be at least 2 characters" }),
  description: z
      .string()
      .min(10, { message: "Description must be at least 10 characters" }),
  area: z.string().min(2, { message: "Area is required" }),
  address: z.string().min(5, { message: "Full address is required" }),
  city: z.string().default("Bangalore"),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  website: z.string().optional(),
  // Operating hours
  operatingHours: z.array(
      z.object({
        day: z.string(),
        open: z.string(),
        close: z.string(),
      })
  ),
  // Stakes
  stakes: z.array(
      z.object({
        name: z.string(),
        smallBlind: z.number().min(1),
        bigBlind: z.number().min(1),
        minBuyIn: z.number().min(1),
        maxBuyIn: z.number().optional(),
        currency: z.string().default("₹"),
      })
  ),
  // Amenities
  amenities: z.string().min(3, { message: "Please list some amenities" }),
});

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const AddClub = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { showLoading, hideLoading } = useLoading();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      area: "",
      address: "",
      city: "Bangalore",
      email: "",
      phone: "",
      website: "",
      operatingHours: DAYS_OF_WEEK.map((day) => ({
        day,
        open: "16:00",
        close: "02:00",
      })),
      stakes: [
        {
          name: "Low Stakes",
          smallBlind: 100,
          bigBlind: 200,
          minBuyIn: 10000,
          maxBuyIn: 40000,
          currency: "₹",
        },
      ],
      amenities: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    showLoading();
    try {
      // Process amenities from comma-separated string to array
      const processedValues = {
        ...values,
        amenities: values.amenities
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item),
      };

      // In a real application, this would send data to a backend API

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 400));

      toast({
        title: "Club submitted for review",
        description:
            "Your club information has been submitted and will be reviewed shortly.",
      });

      navigate("/clubs");
    } finally {
      hideLoading();
    }
  };

  const addStake = () => {
    const currentStakes = form.getValues().stakes;
    form.setValue("stakes", [
      ...currentStakes,
      {
        name: `Stakes ${currentStakes.length + 1}`,
        smallBlind: 100,
        bigBlind: 200,
        minBuyIn: 10000,
        currency: "₹",
      },
    ]);
  };

  const removeStake = (index: number) => {
    const currentStakes = form.getValues().stakes;
    if (currentStakes.length <= 1) return;
    form.setValue(
        "stakes",
        currentStakes.filter((_, i) => i !== index)
    );
  };

  return (
      <MainLayout>
        <div className="container py-8 px-4 max-w-3xl mx-auto">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
          >
            <Button
                variant="ghost"
                className="mb-4 -ml-3 flex items-center text-fuchsia-600 hover:text-fuchsia-700 hover:bg-fuchsia-100/60"
                onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>

            <div className="flex items-center space-x-3 mb-4">
              <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="w-12 h-12 bg-gradient-to-br from-fuchsia-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-md"
              >
                <span className="text-white font-bold text-lg">♠</span>
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Add New Club</h1>
                <p className="text-gray-600">
                  Register your poker club to be listed in our directory
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="bg-white/80 backdrop-blur-md border-gray-200/70 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-800">
                  <Building className="mr-2 h-5 w-5" />
                  Club Information
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Provide details about your poker club to be displayed in the
                  directory
                </CardDescription>
              </CardHeader>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-800">Basic Details</h3>

                      <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700">Club Name*</FormLabel>
                                <FormControl>
                                  <Input
                                      placeholder="e.g., Ace High Poker Club"
                                      {...field}
                                      className="bg-white/70 border-gray-300 focus:border-fuchsia-500"
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                              </FormItem>
                          )}
                      />

                      <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700">Description*</FormLabel>
                                <FormControl>
                                  <Textarea
                                      placeholder="Describe your club, ambiance, unique features..."
                                      className="min-h-24 bg-white/70 border-gray-300 focus:border-fuchsia-500"
                                      {...field}
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                              </FormItem>
                          )}
                      />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-800">Location</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="area"
                            render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-700">Area/Neighborhood*</FormLabel>
                                  <FormControl>
                                    <Input
                                        placeholder="e.g., Indiranagar"
                                        {...field}
                                        className="bg-white/70 border-gray-300 focus:border-fuchsia-500"
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
                                        value="Bangalore"
                                        disabled
                                        {...field}
                                        className="bg-gray-100/70 border-gray-300"
                                    />
                                  </FormControl>
                                  <FormDescription className="text-gray-500">
                                    Currently only supporting Bangalore
                                  </FormDescription>
                                </FormItem>
                            )}
                        />
                      </div>

                      <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700">Full Address*</FormLabel>
                                <FormControl>
                                  <Textarea
                                      placeholder="Full address including landmarks, building name, etc."
                                      {...field}
                                      className="bg-white/70 border-gray-300 focus:border-fuchsia-500"
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                              </FormItem>
                          )}
                      />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-800 flex items-center">
                        <Clock className="mr-2 h-5 w-5" />
                        Operating Hours
                      </h3>

                      {DAYS_OF_WEEK.map((day, index) => (
                          <div
                              key={day}
                              className="grid grid-cols-3 gap-4 items-center"
                          >
                            <div className="font-medium text-gray-700">{day}</div>
                            <FormField
                                control={form.control}
                                name={`operatingHours.${index}.open`}
                                render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input
                                            type="time"
                                            {...field}
                                            className="bg-white/70 border-gray-300 focus:border-fuchsia-500"
                                        />
                                      </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`operatingHours.${index}.close`}
                                render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input
                                            type="time"
                                            {...field}
                                            className="bg-white/70 border-gray-300 focus:border-fuchsia-500"
                                        />
                                      </FormControl>
                                    </FormItem>
                                )}
                            />
                          </div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-800 flex items-center">
                          <DollarSign className="mr-2 h-5 w-5" />
                          Stakes & Games
                        </h3>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addStake}
                            className="border-fuchsia-300 text-fuchsia-600 hover:bg-fuchsia-100/60"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add Stake
                        </Button>
                      </div>

                      {form.watch("stakes").map((stake, index) => (
                          <Card key={index} className="p-4 pt-0 bg-white/60 border-gray-200/50">
                            <CardHeader className="px-0 pt-4">
                              <div className="flex justify-between">
                                <FormField
                                    control={form.control}
                                    name={`stakes.${index}.name`}
                                    render={({ field }) => (
                                        <FormItem className="flex-1 mr-2">
                                          <FormLabel className="text-gray-700">Name</FormLabel>
                                          <FormControl>
                                            <Input
                                                placeholder="e.g., Low Stakes"
                                                {...field}
                                                className="bg-white/70 border-gray-300 focus:border-fuchsia-500"
                                            />
                                          </FormControl>
                                        </FormItem>
                                    )}
                                />

                                {form.watch("stakes").length > 1 && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 mt-7 text-gray-500 hover:text-red-500"
                                        onClick={() => removeStake(index)}
                                    >
                                      ×
                                    </Button>
                                )}
                              </div>
                            </CardHeader>

                            <CardContent className="px-0 py-2">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <FormField
                                    control={form.control}
                                    name={`stakes.${index}.smallBlind`}
                                    render={({ field }) => (
                                        <FormItem>
                                          <FormLabel className="text-gray-700">Small Blind</FormLabel>
                                          <FormControl>
                                            <Input
                                                type="number"
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        parseInt(e.target.value) || 0
                                                    )
                                                }
                                                className="bg-white/70 border-gray-300 focus:border-fuchsia-500"
                                            />
                                          </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name={`stakes.${index}.bigBlind`}
                                    render={({ field }) => (
                                        <FormItem>
                                          <FormLabel className="text-gray-700">Big Blind</FormLabel>
                                          <FormControl>
                                            <Input
                                                type="number"
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        parseInt(e.target.value) || 0
                                                    )
                                                }
                                                className="bg-white/70 border-gray-300 focus:border-fuchsia-500"
                                            />
                                          </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name={`stakes.${index}.minBuyIn`}
                                    render={({ field }) => (
                                        <FormItem>
                                          <FormLabel className="text-gray-700">Min Buy-in</FormLabel>
                                          <FormControl>
                                            <Input
                                                type="number"
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        parseInt(e.target.value) || 0
                                                    )
                                                }
                                                className="bg-white/70 border-gray-300 focus:border-fuchsia-500"
                                            />
                                          </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name={`stakes.${index}.maxBuyIn`}
                                    render={({ field }) => (
                                        <FormItem>
                                          <FormLabel className="text-gray-700">Max Buy-in (Optional)</FormLabel>
                                          <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Optional"
                                                value={field.value || ""}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.value
                                                            ? parseInt(e.target.value)
                                                            : undefined
                                                    )
                                                }
                                                className="bg-white/70 border-gray-300 focus:border-fuchsia-500"
                                            />
                                          </FormControl>
                                        </FormItem>
                                    )}
                                />
                              </div>
                            </CardContent>
                          </Card>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-800">Amenities</h3>
                      <FormField
                          control={form.control}
                          name="amenities"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700">Amenities (comma-separated)</FormLabel>
                                <FormControl>
                                  <Textarea
                                      placeholder="e.g., Professional dealers, Premium bar, Restaurant, Valet parking"
                                      {...field}
                                      className="bg-white/70 border-gray-300 focus:border-fuchsia-500"
                                  />
                                </FormControl>
                                <FormDescription className="text-gray-500">
                                  List amenities separated by commas (e.g., Professional
                                  dealers, Premium bar)
                                </FormDescription>
                                <FormMessage className="text-red-500" />
                              </FormItem>
                          )}
                      />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-800">Contact Information</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-gray-700">Email*</FormLabel>
                                  <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="contact@yourclub.com"
                                        {...field}
                                        className="bg-white/70 border-gray-300 focus:border-fuchsia-500"
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
                                  <FormLabel className="text-gray-700">Phone Number*</FormLabel>
                                  <FormControl>
                                    <Input
                                        placeholder="+91 98765xxxxx"
                                        {...field}
                                        className="bg-white/70 border-gray-300 focus:border-fuchsia-500"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                      </div>

                      <FormField
                          control={form.control}
                          name="website"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700">Website (Optional)</FormLabel>
                                <FormControl>
                                  <Input
                                      placeholder="https://www.yourclub.com"
                                      {...field}
                                      className="bg-white/70 border-gray-300 focus:border-fuchsia-500"
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                              </FormItem>
                          )}
                      />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-800">Club Images</h3>
                      <div className="border-2 border-dashed rounded-lg p-8 text-center border-gray-300">
                        <Image className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                        <p className="text-gray-500 mb-2">
                          Drag & drop images or click to browse
                        </p>
                        <p className="text-xs text-gray-500 mb-4">
                          Recommended: At least 3 high-quality images of your club
                        </p>
                        <Button
                            type="button"
                            variant="outline"
                            className="border-gray-300 text-gray-700 hover:bg-fuchsia-100/60"
                        >
                          Select Images
                        </Button>
                        <FormDescription className="mt-4 text-gray-500">
                          Image upload will be available after admin approval
                        </FormDescription>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-between border-t border-gray-200 pt-6">
                    <Button
                        variant="outline"
                        type="button"
                        onClick={() => navigate("/clubs")}
                        className="border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                      Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-fuchsia-500 to-indigo-500 hover:from-fuchsia-600 hover:to-indigo-600 text-white shadow-md"
                    >
                      {isSubmitting ? (
                          <>Processing...</>
                      ) : (
                          <>
                            <Plus className="h-4 w-4 mr-1" />
                            Submit Club
                          </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </motion.div>
        </div>
      </MainLayout>
  );
};

export default AddClub;
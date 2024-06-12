import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns/format";
import { CalendarIcon, MinusIcon, PlusIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { redirect, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import toast from 'react-hot-toast';
import axios from 'axios';

const formSchema = z.object({
  deliveryDate: z.date().transform((str) => new Date(str)),
  quantity: z.number().positive("Number should be positve"),
  name: z.string({ required_error: 'Name is required'}).min(2).max(50),
  deliveryAddress: z.string({ required_error: 'Delivery Address is required'}),
  phone: z.string({ required_error: 'Phone Number is required'}).regex(/^[0-9]+$/, "Phone number must be numeric"),
  email: z.string().email("Invalid email address"),
  scheduleRepeat: z.enum(["no-repeat", "daily", "weekly", "monthly", "custom"]).optional(),
  repeatEvery: z.string().optional(),
  repeatUnit: z.enum(["day", "week", "month"]).optional(),
  repeatOn: z.enum(["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]).optional(),
})

const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

const Checkout = () => {
  const waterType:any = useLoaderData();

  const [formData, setFormData] = useState<any>({})
  
  const price = 9.99;

  const [totalAmount, setTotalAmount] = useState(price)
  
  const [open, setOpen] = useState(false);
  
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
  }  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues:{
      quantity: 1,
      name: '',
      deliveryAddress: '',
      phone: '',
      email: '',
      scheduleRepeat: 'no-repeat',
      repeatEvery: '1',
      repeatUnit: 'day',
      repeatOn: 'monday',
      deliveryDate: new Date()
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast('Please review your order & Proceed!', {
      icon: '😍',
    });    
    setTotalAmount(values.quantity * price)
    setFormData({...values, totalAmount: values.quantity * price, waterType: waterType?.type})
    setOpen(true)
  }

  const placeOrder = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/orders`, formData);
      console.log('Order created successfully:', response.data);

    } catch (error:any) {
      if (error.response) {
        console.error('Error creating order:', error?.response?.data);
      } else {
        console.error('Error:', error?.message);
      }
    }
  
    toast.success('Order placed! Please check your email.')
    setOpen(false) 
    return redirect('/')
  }

  return (
    <div className="grid grid-cols-4 px-6 md:px-36 py-4 pb-20">
      <div className="col-span-4 md:col-span-2">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">{waterType?.type}</h2> 

        <Dialog open={open} onOpenChange={setOpen}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">         
            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => {
                  return (
                    <FormItem className="">
                      <FormLabel className="text-md">Quantity</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Button 
                              type="button" 
                              onClick={() => field.onChange(field.value - 1)} 
                              disabled={field.value<=1}
                              className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 transition duration-200">
                                <MinusIcon className="w-5 h-5" />
                              </Button>
                            <Input
                              type="number"
                              id="quantity"
                              className="appearance-none w-24 text-md text-center text-black mx-2 border border-blue-300 rounded"
                              min="1"
                              {...field}
                              onChange={event => field.onChange(+event.target.value)}
                            />
                            <Button 
                              type="button" 
                              onClick={() => field.onChange(field.value + 1)} 
                              className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 transition duration-200">
                              <PlusIcon className="w-5 h-5"/>
                            </Button>
                          </div>
                        </div>                  
                      </FormControl>
                    </FormItem>
                  );
                }}
              />

              <div className="flex items-center font-semibold text-xl">Price: <span className="text-green-700 font-bold ml-2"> $ {totalAmount}</span></div>
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter you name" className="py-6 bg-gray-200 placeholder:text-gray-400 font-medium rounded-xl border-none" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deliveryAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter Delivery Address" className=" bg-gray-200 placeholder:text-gray-3400 font-medium rounded-xl border-none" {...field} required/>
                  </FormControl>
                  <FormMessage className="text-red-500"/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" className=" bg-gray-200 placeholder:text-gray-3400 font-medium rounded-xl border-none" {...field} />
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
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" className="rounded-lg bg-gray-200 placeholder:text-gray-400 font-medium rounded-xl border-none" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deliveryDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Delivery Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal rounded-lg bg-gray-200 placeholder:text-gray-3400 font-medium rounded-xl border-none",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Select date to delivery</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        className="bg-white"
                        selected={field?.value}
                        onSelect={field.onChange}
                        disabled={(date: Date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <div className="flex flex-col md:flex-row justify-between">
              <FormField
                control={form.control}
                name="scheduleRepeat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Schedule Repeat</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-[200px] bg-gray-200 placeholder:text-gray-3400 font-medium rounded-xl border-none">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        <SelectItem value="no-repeat">No Repeat</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-4">
                <div className="flex items-center">
                  <FormField
                    control={form.control}
                    name="repeatEvery"
                    render={({ field }) => (
                      <FormItem>
                          <FormControl>
                            <div className="flex flex-col">
                              <div className="flex items-center">
                                <p className="mr-2 font-semibold">Repeat every</p> 
                                <Input 
                                  type="number" 
                                  className="w-24 mr-2 rounded-lg bg-gray-200 placeholder:text-gray-400 font-medium rounded-xl border-none" min={1}  {...field} /> 
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="repeatUnit"
                    render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex flex-col">
                              <div className="flex items-center">
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="w-36 bg-gray-200 placeholder:text-gray-400 font-medium rounded-xl border-none">
                                      <SelectValue />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="bg-white">
                                    <SelectItem value="day">Day</SelectItem>
                                    <SelectItem value="week">Week</SelectItem>
                                    <SelectItem value="month">Month</SelectItem>
                                  </SelectContent>
                                </Select>                       
                                
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage  />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="repeatOn"
                  render={({ field }) => {
                    return (
                      <FormItem className="space-y-2 mt-5">
                        <FormLabel className="text-md">Repeat on</FormLabel>
                        <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          className="flex items-center flex-row mt-4"
                        >
                        {
                          daysOfWeek.map((day) => (
                            <FormItem className="w-full space-x-3" key={day}>
                              <FormControl>
                                <RadioGroupItem value={day}  className="peer hidden" />
                              </FormControl>
                              <FormLabel className="bg-gray-200 placeholder:text-gray-400 cursor-pointer rounded-full h-8 w-8 flex items-center justify-center font-normal shadow-sm hover:border-primary peer-aria-checked:border-primary peer-aria-checked:bg-blue-500 peer-aria-checked:ring-ring peer-aria-checked:text-white uppercase">
                                {day.charAt(0)}
                              </FormLabel>
                            </FormItem>
                          ))
                        }
                        </RadioGroup>
                        
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>
            
            <Button type="submit" variant="outline" className="w-full py-6 rounded-xl bg-blue-500 text-white">
              Place Order & Review
            </Button>
          </form>
        </Form>

        <DialogContent className="bg-white rounded-xl w-[90%] md:w-full">
            <DialogHeader>
              <DialogTitle className="text-2xl">Review your order</DialogTitle>
            </DialogHeader>
              <DialogDescription>
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold">Alkaline Water</h4>
                  <div className="flex items-center justify-between">
                    <p>Quantity</p>
                    <p>x{formData?.quantity}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>Name</p>
                    <p>{formData?.name}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>Delivery Address</p>
                    <p>{formData?.deliveryAddress}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>Email</p>
                    <p>{formData?.email}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>Phone Number</p>
                    <p>{formData?.phone}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>Delivery Date</p>
                    <p>{formatDate(formData?.deliveryDate)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    {/* <p>
                      {formData?.scheduleRepeat=="no-repeat" && `Your order will not repeat`}
                    </p> */}
                    <p>
                      {formData?.scheduleRepeat!=="no-repeat" && `Repeats at every ${formData.repeatEvery} ${formData.repeatUnit} on ${formData.repeatOn}`}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>Total Amount</p>
                    <p className="font-bold">{formData?.totalAmount}</p>
                  </div>
                  <Button onClick={placeOrder} variant="outline" className="w-full py-6 rounded-xl bg-blue-500 hover:bg-blue-700 hover:text-white text-white">
                    Place Order
                  </Button>
                </div>
              </DialogDescription>
          </DialogContent>
        </Dialog>
      
      </div>
      <div className="col-span-2 hidden md:flex items-center justify-center">
        <img src="https://images.ctfassets.net/x1vbd41hpla5/7dbmzoVnvHFpU3S3vo7r6n/84d946b00ce04e698559375ef43c5e70/18500505.png?w=286&fm=webp" alt="" className="h-96" />
      </div>
    </div>
  )
}

export default Checkout
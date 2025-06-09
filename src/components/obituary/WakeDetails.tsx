import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

type Props = {
  showWakeDetails: boolean;
  setShowWakeDetails: (value: boolean) => void;
  time: boolean;
  title:string
  height:string
};

const formSchema = z.object({
  description: z.string(),
  location: z.string().min(1, "Location is required"),
  date: z.string().min(1, "Date is required"),
  timeFrom: z.string().min(1, "Start time is required").optional(),
  timeTo: z.string().min(1, "Start time is required").optional(),
  time: z.string().min(1, "Start time is required").optional(),
});

const WakeDetails: React.FC<Props> = ({
  showWakeDetails,
  setShowWakeDetails,
  time,
  title,
  height
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      location: "",
      date: "",
      timeFrom: "",
      timeTo: "",
      time: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className={`max-w-[1000px] h-[${height}] flex flex-col gap-7`}>
      <div className="h-10 flex items-center justify-between">
        <h3 className="text-lg font-medium">{title}</h3>
        <Switch
          checked={showWakeDetails}
          onCheckedChange={setShowWakeDetails}
        />
      </div>

      {showWakeDetails && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="relative h-[326px]">
                  <FormControl>
                    <Textarea
                      placeholder="Write details about the event for guests to know"
                      className="min-h-[120px] border border-dashed resize-none"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Button Location */}
            <div className="flex justify-end mt-8">
              <Button
                type="button"
                size="sm"
                className="bg-white hover:bg-[#5c8e8a] text-black"
              >
                Location
              </Button>
            </div>

            <div className="bg-[#E5F6EC4D] p-8">
              <div className="flex flex-col gap-6 w-[936px]">
                {/* Location */}
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="flex items-start gap-[166px]">
                      <FormLabel className="w-[100px] pt-2">Location</FormLabel>
                      <FormControl>
                        <Input
                          className="w-[402px] border-0 border-b border-gray-400 rounded-none"
                          placeholder="47 Windmere Lane, Silverbrook, East Alderwyn"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Date */}
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex items-start gap-[166px]">
                      <FormLabel className="w-[100px] pt-2">Date</FormLabel>
                      <FormControl>
                        <Input
                          className="w-[402px] border-0 border-b border-gray-400 rounded-none"
                          type="date"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {time ? (
                  <div>
                    {/* Time From */}
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem className="flex items-start gap-[166px]">
                          <FormLabel className="w-[100px] pt-2">
                            Time
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="w-[402px] border-0 border-b border-gray-400 rounded-none"
                              type="time"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                ) : (
                  <>
                    {/* Time From */}
                    <FormField
                      control={form.control}
                      name="timeFrom"
                      render={({ field }) => (
                        <FormItem className="flex items-start gap-[166px]">
                          <FormLabel className="w-[100px] pt-2">
                            Time From
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="w-[402px] border-0 border-b border-gray-400 rounded-none"
                              type="time"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {/* Time To */}
                    <FormField
                      control={form.control}
                      name="timeTo"
                      render={({ field }) => (
                        <FormItem className="flex items-start gap-[166px]">
                          <FormLabel className="w-[100px] pt-2">
                            Time To
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="w-[402px] border-0 border-b border-gray-400 rounded-none"
                              type="time"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {/* Add button */}
                    <div className="flex items-start gap-[166px]">
                      <div className="w-[100px]" />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="text-white bg-[#699D99] hover:bg-[#5c8e8a]"
                      >
                        + Add
                      </Button>
                    </div>
                  </>
                )}
              </div>

              {/* Submit button */}
              <div className="flex justify-end mt-8">
                <Button
                  type="submit"
                  size="sm"
                  className="bg-[#699D99] hover:bg-[#5c8e8a] text-white"
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default WakeDetails;

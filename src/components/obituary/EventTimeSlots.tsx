// "use client";

// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useFieldArray, useFormContext } from "react-hook-form";

// const EventTimeSlots = ({ eventIndex }: { eventIndex: number }) => {
//   const { control } = useFormContext();

//   const {
//     fields,
//     append,
//     remove,
//   } = useFieldArray({
//     control,
//     name: `events.${eventIndex}.timeSlots`,
//   });

//   return (
//     <div className="space-y-4">
//       <h4 className="text-lg font-semibold">Time Slots</h4>

//       {fields.map((slot, slotIndex) => (
//         <div
//           key={slot.id}
//           className="flex items-center gap-4 border border-dashed p-4 rounded"
//         >
//           <FormField
//             control={control}
//             name={`events.${eventIndex}.timeSlots.${slotIndex}.date`}
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Date</FormLabel>
//                 <FormControl>
//                   <Input type="date" {...field} />
//                 </FormControl>
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={control}
//             name={`events.${eventIndex}.timeSlots.${slotIndex}.timeFrom`}
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>From</FormLabel>
//                 <FormControl>
//                   <Input type="time" {...field} />
//                 </FormControl>
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={control}
//             name={`events.${eventIndex}.timeSlots.${slotIndex}.timeTo`}
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>To</FormLabel>
//                 <FormControl>
//                   <Input type="time" {...field} />
//                 </FormControl>
//               </FormItem>
//             )}
//           />

//           <Button
//             type="button"
//             variant="destructive"
//             onClick={() => remove(slotIndex)}
//             className="mt-6"
//           >
//             Remove
//           </Button>
//         </div>
//       ))}

//       <Button
//         type="button"
//         variant="outline"
//         onClick={() =>
//           append({
//             date: "",
//             timeFrom: "",
//             timeTo: "",
//           })
//         }
//       >
//         + Add Time Slot
//       </Button>
//     </div>
//   );
// };

// export default EventTimeSlots;

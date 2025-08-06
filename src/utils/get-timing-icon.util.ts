import afternoon from "@/assets/timings/afternoon.jpeg?inline";
import dinner from "@/assets/timings/dinner.jpeg?inline";
import fast from "@/assets/timings/fast.jpeg?inline";
import lunch from "@/assets/timings/lunch.jpeg?inline";
import morning from "@/assets/timings/morning.jpeg?inline";

export const getTimingIcon = (timingId: string) => {
  switch (timingId) {
    case "fast":
      console.log("✌️Returning fast icon");
      return fast;
    case "morning":
      return morning;
    case "lunch":
      return lunch;
    case "afternoon":
      return afternoon;
    case "dinner":
      return dinner;
    default:
      return fast;
  }
};

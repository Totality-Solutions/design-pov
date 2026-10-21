import { redirect } from "next/navigation";

// Only the Core page is live for the 2027 edition so far.
export default function Edition2027() {
  redirect("/edition-2027/core");
}

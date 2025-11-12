"use client";

import { useState, useTransition } from "react";
import { Field, FieldLabel, FieldSeparator, FieldSet } from "../ui/field";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { LoadingSwap } from "../ui/loading-swap";
import { signupHandler } from "@/actions/signupHandler";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [isPending, startTransition] = useTransition();
  const [careerTrack, setCareerTrack] = useState("");
  const [otherCareer, setOtherCareer] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await signupHandler(formData);

      if (res.success) {
        toast.success(res.message);
        router.push("/dashboard");
      } else {
        toast.error(res.message);
      }
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FieldSet>
          {/* Name */}
          <Field>
            <FieldLabel htmlFor="name">Your Full Name</FieldLabel>
            <Input id="name" name="name" placeholder="Your Name" required />
          </Field>

          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Your Email</FieldLabel>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              required
            />
          </Field>

          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Your Password"
              required
            />
          </Field>

          {/* Education Level */}
          <Field>
            <FieldLabel htmlFor="education-level">
              Education Level / Department
            </FieldLabel>
            <Input
              type="text"
              id="education-level"
              name="education-level"
              placeholder="Your Education Level or Department"
              required
            />
          </Field>

          {/* Experience Level */}
          <Field>
            <FieldLabel htmlFor="experience-level">Experience Level</FieldLabel>
            <Select required defaultValue="" name="experience-level">
              <SelectTrigger id="experience-level">
                <SelectValue placeholder="Your experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fresher">Fresher</SelectItem>
                <SelectItem value="Junior">Junior</SelectItem>
                <SelectItem value="Mid">Mid</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          {/* Preferred Career Track */}
          <Field>
            <FieldLabel htmlFor="career-track">
              Preferred career track
            </FieldLabel>
            <RadioGroup
              value={careerTrack}
              onValueChange={setCareerTrack}
              defaultValue=""
              className="grid grid-cols-2"
              name="career-track"
            >
              <Field orientation="horizontal">
                <RadioGroupItem value="web-development" id="web-development" />
                <FieldLabel htmlFor="web-development">
                  Web Development
                </FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <RadioGroupItem value="data-science" id="data-science" />
                <FieldLabel htmlFor="data-science">Data Science</FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <RadioGroupItem value="ui-ux-design" id="ui-ux-design" />
                <FieldLabel htmlFor="ui-ux-design">UI/UX Design</FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <RadioGroupItem
                  value="product-management"
                  id="product-management"
                />
                <FieldLabel htmlFor="product-management">
                  Product Management
                </FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <RadioGroupItem value="marketing" id="marketing" />
                <FieldLabel htmlFor="marketing">Marketing</FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <RadioGroupItem value="other" id="other" />
                <FieldLabel htmlFor="other">Other</FieldLabel>
              </Field>
            </RadioGroup>
          </Field>

          {/* Other Career Track Input */}
          {careerTrack === "other" && (
            <Field>
              <FieldLabel htmlFor="other-career">
                Please specify your career track
              </FieldLabel>
              <Input
                id="other-career"
                name="other-career"
                placeholder="Enter your career track"
                value={otherCareer}
                onChange={(e) => setOtherCareer(e.target.value)}
                required
              />
            </Field>
          )}

          <FieldSeparator />

          <Field orientation="horizontal">
            <Checkbox id="terms" name="terms" required />
            <FieldLabel htmlFor="terms">
              I agree to the Terms and Conditions
            </FieldLabel>
          </Field>

          <Field orientation="horizontal">
            <Checkbox id="newsletter" name="newsletter" required />
            <FieldLabel htmlFor="newsletter">
              Send me career tips, job alerts, and personalized recommendations
            </FieldLabel>
          </Field>

          <Button type="submit" className="mt-4 w-full" size="lg">
            <LoadingSwap isLoading={false}>Create My Account</LoadingSwap>
          </Button>
        </FieldSet>
      </form>
    </div>
  );
}

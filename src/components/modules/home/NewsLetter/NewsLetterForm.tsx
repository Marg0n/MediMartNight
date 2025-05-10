
"use client"
import { toast } from "sonner";
import React from "react";
import Image from 'next/image'

const NewsletterForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;

    if (emailInput?.value) {
      toast.success("Message sent!");
      form.reset();
    } else {
      toast.error("Message not sent!");
    }
  };

  return (
    <section className="container mx-auto px-4 w-full min-h-[60vh] rounded-4xl">
      <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-indigo-600 to-rose-500 bg-clip-text text-transparent">
        Subscribe to Our Newsletter
      </h2>

      <div className="flex lg:flex-row flex-col items-center justify-between gap-[50px] lg:gap-[20px]">
        <div className="w-full sm:w-[80%] lg:w-[50%]">
          <Image
            src="https://i.ibb.co/vPgN7fq/dizzy-messages-1.png"
            alt="image"
            className="w-full"
            width={500}
            height={500}
          />
        </div>

        <div className="w-full lg:w-[50%]">
          <h1 className="text-[2rem] sm:text-[3rem] font-[500] capitalize text-text leading-[50px]">
            Join Us!
          </h1>
          <p className="text-[1.1rem] mt-3">
            Subscribe to our weekly newsletter and be a part of our journey to
            self discovery and love.
          </p>

          <form className="mt-12 relative" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              autoComplete="email"
              required
              className="w-full py-4 pl-4 pr-[120px] outline-none focus:ring-0 border rounded-full border-[#00b0ff]"
            />
            <button
              type="submit"
              className="px-8 py-3 absolute top-0 right-0 h-full rounded-full rounded-tl-[0px] hover:bg-[#02aaf2] bg-[#00b0ff] text-white"
            >
              Submit
            </button>
          </form>

        </div>
      </div>
    </section>
  );
};

export default NewsletterForm;
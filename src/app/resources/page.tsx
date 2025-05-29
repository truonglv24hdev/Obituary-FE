import Image from "next/image";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconFuneral, IconShop } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Heading from "@/components/layout/Heading";

const articles = [
  {
    title: "The Healing Power of Ritual and Prayer",
    date: "Mar 6, 2025",
    desc: "Simple rituals can offer profound comfort. Discover practices you can do at home or in nature to feel connected, grounded, and held.",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Writing a Tribute: Words That Honor a Life",
    date: "Mar 6, 2025",
    desc: "Not sure where to begin? This gentle guide walks you through crafting a meaningful tribute that captures the essence of your loved one.",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Messages from Beyond: How Loved Ones Stay Close",
    date: "Mar 6, 2025",
    desc: "Butterflies, dreams, sudden warmth — these moments may be more than coincidence. Learn how many interpret signs from those who’ve passed.",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Writing a Tribute: Words That Honor a Life",
    date: "Mar 6, 2025",
    desc: "Not sure where to begin? This gentle guide walks you through crafting a meaningful tribute that captures the essence of your loved one.",
    img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Messages from Beyond: How Loved Ones Stay Close",
    date: "Mar 6, 2025",
    desc: "Butterflies, dreams, sudden warmth — these moments may be more than coincidence. Learn how many interpret signs from those who have passed.",
    img: "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Honoring the Soul’s Journey: What Comes After Goodbye",
    date: "Mar 6, 2025",
    desc: "From ancient beliefs to modern reflections, this piece invites you to consider the soul’s journey beyond this life and how love continues.",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
];

const page = () => {
  return (
    <>
      <div className="relative h-122">
        <div className="absolute inset-0 z-0">
          <Image src="/img/pricing.jpg" alt="Logo" fill />
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="h-32 w-[480px] flex flex-col items-center justify-center text-center text-white">
              <div className="font-medium text-[64px] ">Resource</div>
              <p className="h-[21px] font-light text-xl">
                Explore Insights, Reflections, and Resources to Help You
                Navigate Grief, Celebration, and Remembrance
              </p>
            </div>
          </div>
        </div>

        <Heading className="absolute inset-0 z-10" />
      </div>
      <div className="flex flex-col items-center px-62 py-20 gap-17 bg-white h-[828px]">
        <div className="w-[944px] h-30 gap-15 flex flex-col md:flex-row md:justify-between items-start mb-10">
          <h1 className="w-[406px] h-[96px] font-medium text-[40px] text-gray-900 mb-4 md:mb-0">
            A space for the heart,
            <br />
            mind, and spirit.
          </h1>
          <p className="text-gray-600 w-[478px] font-light text-[18px] md:ml-8">
            Explore a thoughtful collection of blogs and articles created to
            offer comfort, spiritual insight, and guidance during life most
            meaningful transitions. Whether you are navigating grief or simply
            seeking peace, these words are here to hold you.
          </p>
        </div>
        <div className="w-[944px] h-[480px] flex flex-col md:flex-row gap-8">
          {/* Flower Shops Card */}
          <Card className=" w-[458px] h-120">
            <Image
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
              alt="Flower Shop"
              width={459}
              height={320}
              className="w-[459px] h-[320px] object-cover rounded-t-lg"
            />
            <div className="flex flex-row h-[92px] gap-20 items-center justify-center">
              <CardHeader className="">
                <IconShop className="w-19 h-19 text-[#699D99]" />
              </CardHeader>
              <CardContent className="flex flex-col gap-2 text-star">
                <CardTitle className="font-semibold text-[32px] leading-10">
                  Flower Shops
                </CardTitle>
                <span className="font-light text-xl leading-7 text-gray-500">
                  Explore all
                </span>
              </CardContent>
            </div>
          </Card>

          {/* Funeral Directors Card */}
          <Card className=" w-[458px] h-120">
            <Image
              src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
              alt="Flower Shop"
              width={459}
              height={320}
              className="w-[459px] h-[320px] object-cover rounded-t-lg"
            />
            <div className="flex flex-row h-[92px] gap-20 items-center justify-center">
              <CardHeader className="">
                <IconFuneral className="w-19 h-19 text-[#699D99]" />
              </CardHeader>
              <CardContent className="flex flex-col gap-2 text-star">
                <CardTitle className="font-semibold text-[32px] leading-10">
                  Funeral Directors
                </CardTitle>
                <span className="font-light text-xl leading-7 text-gray-500">
                  Explore all
                </span>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
      <div className="bg-[#f7fbf9] h-[1568px] px-25 py-10">
        <div className="w-[1240px] h-[1408px] flex flex-col gap-20 mx-auto">
          <div className="h-12 flex  justify-between ">
            <h1 className="w-[446px] text-[40px] font-serif font-medium text-gray-800">
              Latest blogs and articles
            </h1>
            <div className="w-[218px] h-11 flex pl-2 gap-2 ">
              <Button className="bg-[#699D99] text-white py-2 px-7 rounded text-base font-light">
                Blogs
              </Button>
              <Button className="border border-gray-400 bg-white text-black py-2 px-7 rounded text-base font-light">
                Articles
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 h-[1280px]">
            {articles.map((a, idx) => (
              <div key={idx} className="bg-white rounded-lg p-7">
                <div className="w-[338px] h-[570px] flex flex-col gap-10">
                  <Image
                    src={a.img}
                    alt={a.title}
                    width={338}
                    height={282}
                    className="rounded-md h-[282px] object-cover"
                  />
                  <div className="flex flex-col gap-6">
                    <span className="w-[110px] h-10 rounded-sm px-3 py-2 font-light text-base bg-[#C2DBD4] ">
                      {a.date}
                    </span>
                    <div className="h-[132px] gap-4 mb-2">
                      <h2 className="font-medium text-2xl">{a.title}</h2>
                      <p className="font-medium text-base">{a.desc}</p>
                    </div>
                    <Link
                      href="#"
                      className="text-base font-medium flex items-center w-[115px] justify-center text-center"
                    >
                      Read more
                      <span className="ml-1 group-hover:translate-x-1 transition-transform text-center text-2xl">
                        &rarr;
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;

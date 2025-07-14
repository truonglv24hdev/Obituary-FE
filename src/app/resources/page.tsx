import Image from "next/image";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconFuneral, IconShop } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Heading from "@/components/layout/Heading";
import Footer from "@/components/layout/Footer";
import { articles } from "@/constants/resource";

const page = () => {
  return (
    <div className="w-full">
      <div className="relative h-122 sm:h-[488px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/resource.jpg"
            alt="Logo"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
          <div className="absolute inset-0 z-10 flex items-center justify-center px-4 sm:px-0">
            <div className="h-auto w-full sm:w-[480px] flex flex-col items-center justify-center text-center text-white">
              <div className="font-medium text-[32px] sm:text-[64px]">
                Resource
              </div>
              <p className="museo font-light text-base sm:text-xl">
                Explore Insights, Reflections, and Resources to Help You
                Navigate Grief, Celebration, and Remembrance
              </p>
            </div>
          </div>
        </div>
        <Heading className="absolute inset-0 z-10" />
      </div>

      <div className="flex flex-col items-center px-4 sm:px-62 py-20 gap-10 bg-white">
        <div className="max-w-[944px] flex flex-col sm:flex-row gap-10 mb-10">
          <h1 className="w-full sm:w-[415px] font-medium text-[28px] sm:text-[37px] text-gray-900">
            A space for the heart, mind, and spirit.
          </h1>
          <p className="text-gray-600 w-full sm:w-[478px] museo font-light text-base sm:text-[18px]">
            Explore a thoughtful collection of blogs and articles created to
            offer comfort, spiritual insight, and guidance during life most
            meaningful transitions. Whether you are navigating grief or simply
            seeking peace, these words are here to hold you.
          </p>
        </div>

        <div className="max-w-[944px] flex flex-col sm:flex-row gap-8">
          {/* Flower Shops Card */}
          <Card className="w-full sm:w-[458px] h-auto sm:h-120">
            <div>
              <Image
                src="/img/rl.jpg"
                alt="Flower Shop"
                width={459}
                height={320}
                className="w-full h-[220px] sm:h-[320px] object-cover rounded-t-lg"
              />
            </div>
            <div className="flex sm:flex-row h-auto sm:h-[92px] gap-10 sm:gap-12 items-center justify-center p-4">
              <CardHeader>
                <IconShop className="w-19 h-19 text-[#699D99]" />
              </CardHeader>
              <CardContent className="flex flex-col gap-2 text-star">
                <CardTitle className="font-semibold museo text-xl sm:text-[32px] leading-7 sm:leading-10">
                  Flower Shops
                </CardTitle>
                <span className="font-light museo text-base sm:text-xl text-gray-500">
                  Explore all
                </span>
              </CardContent>
            </div>
          </Card>

          {/* Funeral Directors Card */}
          <Card className="w-full sm:w-[458px] h-auto sm:h-120">
            <Image
              src="/img/rr.png"
              alt="Funeral Directors"
              width={459}
              height={320}
              className="w-full h-[220px] sm:h-[320px] object-cover rounded-t-lg"
            />
            <div className="flex sm:flex-row h-auto sm:h-[92px] gap-8  sm:gap-12 items-center justify-center p-4">
              <CardHeader>
                <IconFuneral className="w-19 h-19 text-[#699D99]" />
              </CardHeader>
              <CardContent className="flex flex-col gap-2 text-star">
                <CardTitle className="font-semibold md:w-[260px] museo text-xl sm:text-[32px] leading-7 sm:leading-10">
                  Funeral Directors
                </CardTitle>
                <span className="font-light museo text-base sm:text-xl text-gray-500">
                  Explore all
                </span>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>

      <div className="bg-[#f7fbf9] w-full px-4 sm:px-25 py-10">
        <div className="max-w-[1240px] flex flex-col gap-10 sm:gap-20 mx-auto">
          <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-0">
            <h1 className="text-[28px] sm:text-[40px] font-serif font-medium text-gray-800">
              Latest blogs and articles
            </h1>
            <div className="flex gap-2 items-center">
              <Button className="bg-[#699D99] cursor-pointer text-white py-2 px-5 sm:px-7 rounded text-sm sm:text-base font-light">
                Blogs
              </Button>
              <Button className="border cursor-pointer border-gray-400 bg-white text-black py-2 px-5 sm:px-7 rounded text-sm sm:text-base font-light">
                Articles
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {articles.map((a, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4 sm:p-7">
                <div className="w-full h-auto flex flex-col gap-6 sm:gap-10">
                  <Image
                    src={a.img}
                    alt={a.title}
                    width={338}
                    height={282}
                    className="rounded-md h-[200px] sm:h-[282px] object-cover"
                  />
                  <div className="flex flex-col gap-4 sm:gap-6">
                    <span className="w-fit px-3 py-2 rounded-sm text-sm sm:text-base bg-[#C2DBD4]">
                      {a.date}
                    </span>
                    <div className="gap-2 sm:gap-4">
                      <h2 className="font-medium text-lg sm:text-2xl">
                        {a.title}
                      </h2>
                      <p className="font-medium museo text-sm sm:text-base">
                        {a.desc}
                      </p>
                    </div>
                    <Link
                      href="#"
                      className="text-sm sm:text-base font-medium flex items-center w-fit text-[#699D99]"
                    >
                      Read more
                      <span className="ml-1 group-hover:translate-x-1 transition-transform text-2xl">
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
    </div>
  );
};

export default page;

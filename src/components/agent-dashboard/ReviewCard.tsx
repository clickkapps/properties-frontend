import { Star } from "lucide-react";

const ReviewCard = () => {
  return (
    <div className=" w-full pb-4 flex space-x-4">
      {/* Profile Image - Completely Separated on the Left */}
      <div className="flex-shrink-0">
        <img
          src={""}
          alt="David Holm"
          className="w-14 h-14 rounded-full"
        />
      </div>

      {/* Right Section*/}
      <div className="flex-1">
        
        <div className="flex items-start justify-between">
          {/* Name & Date */}
          <div>
            <h3 className="font-medium">David Holm</h3>
            <p className="text-xs text-gray-700 font-[inter]">17/02/2025</p>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-1">
            <span className="hidden md:block text-sm font-medium">(4.5 rating)</span>
            <Star size={14} fill={'black'}/>
            <Star size={14} fill={'black'} />
            <Star size={14} fill={'black'}/>
            <Star size={14} />
            <Star size={14} />
            {/*<StarHalf size={14} />*/}
          </div>
        </div>

        {/* Review Text */}
        <p className="mt-2 text-gray-800 text-[15px] leading-relaxed">
          Beautiful property with a great layout, modern finishes, and a
          fantastic location. Perfect for comfortable and convenient living!
        </p>

        {/* Buttons */}
        <div className="mt-3 flex space-x-6 text-sm font-medium">
          <button className="hover:text-black">reply</button>
          <button className="hover:text-black">helpful</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

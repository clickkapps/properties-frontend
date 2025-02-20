import { userImg1, userImg2 } from "@/assets";
import { Star } from "lucide-react";


const reviews = [
  {
    name: "Michael",
    location: "Lapaz, Accra",
    rating: 5,
    date: "5 days ago",
    text: "I was very impressed with the house designs. Very very amazing.",
    image: userImg1,
  },
  {
    name: "John",
    location: "Airport, Accra",
    rating: 5,
    date: "5 days ago",
    text: "Prime location, affordable house right in the heart of the city.",
    image: userImg2,
  },
];

const ratingsData = [
  { stars: 5, percentage: "80%"},
  { stars: 4, percentage: "50%"},
  { stars: 3, percentage: "30%"},
  { stars: 2, percentage: "15%"},
  { stars: 1, percentage: "10%"},
];

const ReviewSection = () => {
  return (
    <div className="bg-white p-6 m-10 shadow-md w-full max-w-2xl border border-gray-300">
      <h2 className="text-lg font-medium">Reviews</h2>
      <div className="flex items-center space-x-2 mt-2">
        <Star className="w-5 h-5" style={{ fill:"black" }}/>
        <span className="text-lg font-medium">4.5</span>
        <span className="pl-2">98 reviews</span>
      </div>

      {/* Ratings */}
      <h3 className="text-md font-medium mt-4">Overall ratings</h3>
      <div className="space-y-2 mt-2">
        {ratingsData.map((rating, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className="text-sm font-medium">{rating.stars}</span>
            <div className="w-full bg-[#D9D9D9] h-2 rounded-md">
              <div
                className="bg-[#6A6A6A] h-2 rounded-md"
                style={{ width: rating.percentage }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* User Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {reviews.map((review, index) => (
          <div key={index} className="flex flex-col p-4 rounded-lg">
            <div className="flex items-center space-x-4">
              <img
                src={review.image}
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-md">{review.name}</h4>
                <p className="text-gray-500 text-sm">{review.location}</p>
              </div>
            </div>

            <div className="flex items-center space-x-1 mt-2">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4" style={{ fill:"black" }}/>
              ))}
              <span className="text-sm text-gray-500 pl-4">{review.date}</span>
            </div>

            <p className="text-black text-[15px] mt-2">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReviewSection
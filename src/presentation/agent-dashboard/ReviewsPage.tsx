import ReviewCard from "@/components/agent-dashboard/ReviewCard"

function ReviewsPage() {
    return (
        <div className="max-w-sm md:max-w-5xl">
            <h3 className="text-2xl font-semibold mb-4">Reviews</h3>

            <div className="space-y-4">
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
            </div>
        </div>
    )
}

export default ReviewsPage
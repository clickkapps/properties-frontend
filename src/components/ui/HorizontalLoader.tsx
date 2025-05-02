function HorizontalLoader() {
    return (
        <div className="relative w-full h-[2px] bg-gray-200 overflow-hidden rounded">
            <div className="absolute top-0 left-0 h-full bg-red-500 animate-[progress_1.5s_linear_infinite]"
                 style={{width: '20%'}}/>
        </div>
    )
}

export default HorizontalLoader;
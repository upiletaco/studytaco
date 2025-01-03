import { Card } from "@/components/ui/card";

const LivesDisplay = ({ lives }: { lives: number }) => (

    <Card className="rounded-[48px] p-2 bg-white overflow-hidden relative m-2 flex justify-around align-middle items-center">

        {[...Array(5)].map((_, i) => (
            <div
                key={i}
                className={`transition-all duration-1000 transform ${i >= lives ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
            >
                <img 
                        src="/taco-design.png" 
                        alt="Taco Icon" 
                        className="rounded-lg w-12 h-12 object-cover"
                      />
            </div>
        ))}
    </Card>
);

export default LivesDisplay
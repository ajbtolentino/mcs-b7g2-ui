import { useEffect, useState } from "react"

export const Timer = (props: {duration: number, callback?: () => void}) => {
    const [counter, setCounter] = useState(props.duration);

    useEffect(() => {
        setCounter(props.duration);
    }, [props.duration]);

    useEffect(() => {
        const timer = setTimeout(() => setCounter(() => counter - 1), 1000);

        if(counter === 0 && props.callback) props.callback();

        return () => clearInterval(timer);
    }, [counter]);

    return (
        <>
            {
                counter > 0 &&
                <>
                    {
                        <>{(Math.floor(counter / 3600) % 60).toLocaleString("en-US", {minimumIntegerDigits: 2})}:</>
                    }
                    {
                        <>{Math.floor((counter / 60) % 60).toLocaleString("en-US", {minimumIntegerDigits: 2})}:</>
                    }
                    {
                        <>{Math.floor(counter % 60).toLocaleString("en-US", {minimumIntegerDigits: 2})} </>
                    }
                </>
            }
        </>
    )
}
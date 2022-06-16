import { duration } from "@mui/material";
import { useEffect, useState } from "react"

export const Timer = (props: {duration: number}) => {
    const [counter, setCounter] = useState(props.duration);

    useEffect(() => {
        setCounter(props.duration);
    }, [props.duration]);

    useEffect(() => {
        const timer = setTimeout(() => setCounter(() => counter - 1), 1000);

        return () => clearInterval(timer);
    }, [counter]);

    return (
        <>
            {
                counter > 0 &&
                <>
                {
                    counter <= 60 && <>{Math.round(counter)} seconds </>
                }
                {
                    counter > 3600 && <>{Math.round(counter / 3600)} hours </>
                }
                {
                    counter > 60 && <>{Math.round(counter / 60)} minutes </>
                }

                remaining
                </>
            }
        </>
    )
}
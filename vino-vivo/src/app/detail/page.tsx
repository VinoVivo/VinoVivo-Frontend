
import CardDetail, {WineProps } from "@/components/product/detail/CardDetail";


export default function detailPage({wine}: WineProps) {
    return(
        <CardDetail wine={wine}/>
    )
}

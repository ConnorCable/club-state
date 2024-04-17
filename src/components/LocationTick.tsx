import { IonChip, IonIcon, IonLabel } from "@ionic/react"
import { pin } from "ionicons/icons"

interface LocationTick {
    lat: number,
    lng: number,
    text: string,
}



export const LocationTick:React.FC<LocationTick> = ({lat, lng}) => {


    return (
        <IonChip>
        <IonIcon icon={pin} color="primary"></IonIcon>
        <IonLabel>Icon Chip</IonLabel>
      </IonChip>
    )
}
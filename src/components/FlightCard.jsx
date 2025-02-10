import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function FlightCard({ flight }) {
  return (
    (<Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{flight.airline.name}</span>
          <Badge variant="outline">{flight.flight.iata}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col justify-between items-center mb-2">
          <div>
            <p className="text-sm text-muted-foreground">Departure</p>
            <p className="font-medium">{flight.departure.airport}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Arrival</p>
            <p className="font-medium">{flight.arrival.airport}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">Status</p>
          <Badge variant={flight.flight_status === "active" ? "default" : "secondary"}>{flight.flight_status}</Badge>
        </div>
      </CardContent>
    </Card>)
  );
}


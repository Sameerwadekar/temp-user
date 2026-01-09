import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Calendar, Mail, MapPin } from "lucide-react";
import { useLogin } from "./Context/LoginContext";

export default function ProfileHeader() {
  const {user} = useLogin();
   const name = user?.name || "John Doe";
  const email = user?.email || "john.doe@example.com";
  const role = user?.roleName || "ROLE_USER";
  const location = "Mumbai, India"; // dummy
  const joinedDate = "March 2023"; // dummy
  const designation = "Software Developer"; // dummy

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          
          {/* Avatar */}
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://bundui-images.netlify.app/avatars/08.png"
                alt="Profile"
              />
              <AvatarFallback className="text-2xl">
                {name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <Button
              size="icon"
              variant="outline"
              className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full"
            >
              <Camera />
            </Button>
          </div>

          {/* Profile Info */}
          <div className="flex-1 space-y-2">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <h1 className="text-2xl font-bold">{name}</h1>
              <Badge variant="secondary">{role}</Badge>
            </div>

            <p className="text-muted-foreground">{designation}</p>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Mail className="size-4" />
                {email}
              </div>

              <div className="flex items-center gap-1">
                <MapPin className="size-4" />
                {location}
              </div>

              <div className="flex items-center gap-1">
                <Calendar className="size-4" />
                Joined {joinedDate}
              </div>
            </div>
          </div>

          <Button variant="default">Edit Profile</Button>
        </div>
      </CardContent>
    </Card>
  );
}
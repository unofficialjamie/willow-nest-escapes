import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FileText, Hotel, Image, Settings, TrendingUp, Users, Eye } from "lucide-react";

const AdminDashboard = () => {
  const menuItems = [
    {
      title: "Pages Management",
      description: "Control all website pages - text, images, buttons, and layout sections",
      icon: FileText,
      link: "/admin/pages",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Room Management",
      description: "Add, edit, and manage rooms across all hotel locations",
      icon: Hotel,
      link: "/admin/rooms",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Content Editor",
      description: "Quick access to edit images, descriptions, and other content",
      icon: Image,
      link: "/admin/content",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Settings",
      description: "Manage logos, favicon, account settings, and site configuration",
      icon: Settings,
      link: "/admin/settings",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const stats = [
    { label: "Total Pages", value: "11", icon: FileText, change: "+0%" },
    { label: "Active Rooms", value: "8", icon: Hotel, change: "+2" },
    { label: "Content Items", value: "45+", icon: Image, change: "+12" },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Welcome to Admin Dashboard</h1>
        <p className="text-muted-foreground text-lg">
          Manage your hotel website content, rooms, and settings all in one place
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change} from last update
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Menu Cards */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map((item) => (
            <Link key={item.link} to={item.link} className="group">
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 hover:border-primary/50">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`p-4 rounded-xl ${item.bgColor} group-hover:scale-110 transition-transform`}>
                      <item.icon className={`h-8 w-8 ${item.color}`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
                      <CardDescription className="text-base">
                        {item.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Quick Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm">• Use the <strong>Pages Management</strong> section to edit content on any website page</p>
          <p className="text-sm">• <strong>Room Management</strong> lets you add new rooms and update existing ones with photos</p>
          <p className="text-sm">• Upload images directly in the <strong>Content Editor</strong> for faster updates</p>
          <p className="text-sm">• Check <strong>Settings</strong> to update your logo, favicon, and account information</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;

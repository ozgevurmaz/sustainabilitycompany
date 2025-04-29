"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Settings,
  LogOut,
  Loader2,
  Image,
  Home,
  MessageSquare,
  BarChart3,
  Search,
  ArrowUpRight,
  CalendarIcon,
  BookOpen,
  Clock,
  Users,
  ExternalLink,
} from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import CustomCard from "../../components/admin/CustomCard";
import { getCachedActivities, setCachedActivities } from "@/lib/cache";
import { ActivityType } from "@/lib/types/types";
import { fetchActivities } from "@/lib/actions";
import ActivityCard from "@/components/admin/ActivityCard";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dateRange, setDateRange] = useState("30d");
  const [activities, setActivities] = useState<ActivityType[]>([])

  useEffect(() => {
    if (status !== "loading" && (!session || session.user?.role !== "admin")) {
      router.push("/admin/login");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  const loadActivities = async () => {
    const response = await fetchActivities();
    setActivities(response);
  };

  useEffect(() => {
    loadActivities();
  }, []);

  const refreshActivities = async () => {
    const data = await fetchActivities();
    setCachedActivities(data);
    setActivities(data);
  };

  const quickStats = [
    { title: "Total Blog Posts", value: "24", change: "+3 this month" },
    { title: "Services Listed", value: "12", change: "Last updated 3 days ago" },
    { title: "Site Visitors", value: "1,254", change: "+18% from last month" },
    { title: "Contact Inquiries", value: "16", change: "8 new this week" },
  ];

  const navigationCards = [
    {
      title: "Manage Blog",
      description: "Create, edit, and delete blog posts",
      icon: <FileText className="h-6 w-6" />,
      href: "/admin/blog",
    },
    {
      title: "Manage Services",
      description: "Add, update, and remove services",
      icon: <Settings className="h-6 w-6" />,
      href: "/admin/services",
    },
    {
      title: "Testimonials",
      description: "Manage customer testimonials",
      icon: <MessageSquare className="h-6 w-6" />,
      href: "/admin/testimonials",
    },
  ];

  // Mock data for charts from analytics dashboard
  const mockBlogVisits = [
    { title: "10 Easy Ways to Reduce Your Carbon Footprint", visits: 840, comments: 24 },
    { title: "Understanding Renewable Energy Options for Your Home", visits: 720, comments: 18 },
    { title: "The Business Case for Sustainability", visits: 650, comments: 15 },
    { title: "Water Conservation Techniques That Save Money", visits: 580, comments: 12 },
    { title: "Waste Reduction Strategies for Small Businesses", visits: 520, comments: 10 },
  ];

  const mockServiceInterest = [
    { name: "Energy Audit", value: 35 },
    { name: "Sustainability Consulting", value: 25 },
    { name: "Green Certification", value: 20 },
    { name: "Waste Management", value: 15 },
    { name: "Renewable Installation", value: 5 },
  ];

  const mockTrafficSource = [
    { name: "Organic Search", value: 45 },
    { name: "Social Media", value: 25 },
    { name: "Direct", value: 15 },
    { name: "Referral", value: 10 },
    { name: "Email", value: 5 },
  ];

  const mockMonthlyVisits = [
    { month: "Jan", visits: 1200 },
    { month: "Feb", visits: 1350 },
    { month: "Mar", visits: 1400 },
    { month: "Apr", visits: 1650 },
    { month: "May", visits: 1800 },
    { month: "Jun", visits: 1950 },
    { month: "Jul", visits: 2100 },
    { month: "Aug", visits: 2250 },
    { month: "Sep", visits: 2400 },
    { month: "Oct", visits: 2550 },
    { month: "Nov", visits: 2700 },
    { month: "Dec", visits: 2850 },
  ];

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        {/* Welcome message and search */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome back, {session?.user?.name || 'Admin'}</h2>
            <p className="text-gray-600">Here's what's happening with your sustainability website</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-4 w-4 text-gray-500" />
              <Select
                value={dateRange}
                onValueChange={setDateRange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 3 months</SelectItem>
                  <SelectItem value="6m">Last 6 months</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <CustomCard title={stat.title} middleValue={stat.value} desc={stat.change} key={index} />
          ))}
        </div>

        {/* Tabs for Dashboard Content */}
        <Tabs defaultValue="recent" className="mb-8">
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="recent">Recent Activities</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
          </TabsList>

          {/* Recent Tab */}
          <TabsContent value="recent">
            {/* Recent Activity Panel */}
            <Card className="mb-8">
              <CardHeader className="relative">
                <CardTitle>Recent Activity</CardTitle>
                <Button onClick={() => refreshActivities()} className="absolute top-3 right-3" variant={"outline"}>Refresh</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.slice(0,4).map((a) => <ActivityCard key={a._id} activity={a} />)}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Overview Chart */}
          <TabsContent value="overview">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Monthly Website Visitors</CardTitle>
                <CardDescription>
                  Track the growth of your website traffic over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={mockMonthlyVisits}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="visits"
                        stroke="#4F46E5"
                        activeDot={{ r: 8 }}
                        name="Website Visitors"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Traffic Sources */}
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                  <CardDescription>
                    How visitors are finding your website
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={mockTrafficSource}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {mockTrafficSource.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Service Interest */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Service Interest Distribution</CardTitle>
                    <CardDescription>
                      Which services visitors are most interested in
                    </CardDescription>
                  </div>
                  <Link
                    href="/admin/services"
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    Manage Services
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={mockServiceInterest}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {mockServiceInterest.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content">
            {/* Blog Performance */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Top Performing Blog Posts</CardTitle>
                  <CardDescription>
                    Most visited blog posts and engagement metrics
                  </CardDescription>
                </div>
                <Link
                  href="/admin/blog"
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                >
                  Manage Blog
                  <ExternalLink className="h-4 w-4 ml-1" />
                </Link>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2">Post Title</th>
                        <th className="text-right py-3 px-2">Visits</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockBlogVisits.map((post, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-2 font-medium">
                            <div className="truncate max-w-[250px]">
                              {post.title}
                            </div>
                          </td>
                          <td className="py-3 px-2 text-right">{post.visits}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Engagement Tab */}
          <TabsContent value="engagement">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Content Recommendations</CardTitle>
                <CardDescription>
                  Suggestions to improve engagement based on analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                    <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Blog Content Opportunity
                    </h4>
                    <p className="text-sm text-blue-700 mb-3">
                      Your most popular content is about carbon footprint reduction. Consider creating more related blog posts on practical sustainability tips for individuals and families.
                    </p>
                    <Link href="/admin/blog/new" className="text-sm font-medium text-blue-700 hover:text-blue-900">
                      Create New Blog Post →
                    </Link>
                  </div>
                  <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
                    <h4 className="font-medium text-purple-800 mb-2 flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2" />
                      Testimonial Opportunity
                    </h4>
                    <p className="text-sm text-purple-700 mb-3">
                      Most of your contact forms are service inquiries. Consider asking satisfied clients for testimonials to showcase on your website and build trust with new visitors.
                    </p>
                    <Link href="/admin/testimonials" className="text-sm font-medium text-purple-700 hover:text-purple-900">
                      Manage Testimonials →
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Navigation Cards */}
        <h3 className="text-lg font-medium text-gray-800 mb-4">Quick Access</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {navigationCards.map((card, index) => (
            <Link href={card.href} key={index}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-green-50">
                      {card.icon}
                    </div>
                    <CardTitle>{card.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{card.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
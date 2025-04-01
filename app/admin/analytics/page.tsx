"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
  BarChart3,
  Loader2,
  ArrowUpRight,
  CalendarIcon,
  FileText,
  MessageSquare,
  Settings,
  ExternalLink,
  BookOpen,
  Clock,
  Users,
} from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import Link from "next/link";

// Mock data - would be replaced with actual API calls
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

const mockContactReasons = [
  { month: "Jan", service: 10, quote: 6, question: 8 },
  { month: "Feb", service: 12, quote: 8, question: 7 },
  { month: "Mar", service: 14, quote: 10, question: 9 },
  { month: "Apr", service: 16, quote: 12, question: 11 },
  { month: "May", service: 18, quote: 14, question: 10 },
  { month: "Jun", service: 20, quote: 15, question: 12 },
];

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function AnalyticsDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dateRange, setDateRange] = useState("30d");

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

  // Quick stats data
  const quickStats = [
    {
      title: "Monthly Visitors",
      value: "2,850",
      change: "+12% from last month",
      icon: <Users className="h-4 w-4 text-blue-600" />,
      trend: "up",
    },
    {
      title: "Blog Engagement",
      value: "24 comments",
      change: "+6 from last month",
      icon: <BookOpen className="h-4 w-4 text-green-600" />,
      trend: "up",
    },
    {
      title: "Avg. Time on Site",
      value: "3:24",
      change: "+0:42 from last month",
      icon: <Clock className="h-4 w-4 text-purple-600" />,
      trend: "up",
    },
    {
      title: "Contact Inquiries",
      value: "47",
      change: "+15 from last month",
      icon: <MessageSquare className="h-4 w-4 text-amber-600" />,
      trend: "up",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Website Analytics
            </h2>
            <p className="text-gray-600">
              Monitor visitor engagement and content performance
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
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

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  </div>
                  <div className="p-2 rounded-full bg-gray-100">
                    {stat.icon}
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                  <p className="text-sm text-green-600">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Visitors Chart */}
          <Card className="col-span-1 lg:col-span-2">
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
                      <th className="text-right py-3 px-2">Comments</th>
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
                        <td className="py-3 px-2 text-right">{post.comments}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
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
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
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

          {/* Contact Inquiries */}
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Contact Inquiries by Type</CardTitle>
              <CardDescription>
                Monthly breakdown of contact form submissions by reason
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mockContactReasons}
                    margin={{
                      top: 20,
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
                    <Bar dataKey="service" stackId="a" fill="#8884d8" name="Service Inquiry" />
                    <Bar dataKey="quote" stackId="a" fill="#82ca9d" name="Quote Request" />
                    <Bar dataKey="question" stackId="a" fill="#ffc658" name="General Question" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Recommendations */}
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
              <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                <h4 className="font-medium text-green-800 mb-2 flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Service Highlight Recommendation
                </h4>
                <p className="text-sm text-green-700 mb-3">
                  "Energy Audit" is your most viewed service. Consider featuring it more prominently on the homepage and creating additional content that explains its benefits in detail.
                </p>
                <Link href="/admin/homepage" className="text-sm font-medium text-green-700 hover:text-green-900">
                  Update Homepage →
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
      </main>
    </div>
  );
}

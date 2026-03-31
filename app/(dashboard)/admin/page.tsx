import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Users, Building2, LogIn, LogOut, ArrowRight } from "lucide-react";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/dashboard");
  }

  const [
    totalUsers,
    totalProperties,
    checkInsThisMonth,
    checkOutsThisMonth,
    recentCheckIns,
  ] = await Promise.all([
    prisma.user.count({ where: { role: "CLIENT" } }),
    prisma.property.count(),
    prisma.checkIn.count({
      where: {
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
    }),
    prisma.checkOut.count({
      where: {
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
    }),
    prisma.checkIn.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: { property: true },
    }),
  ]);

  const stats = [
    {
      label: "Total Users",
      value: totalUsers,
      icon: Users,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Total Properties",
      value: totalProperties,
      icon: Building2,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      label: "Check-ins This Month",
      value: checkInsThisMonth,
      icon: LogIn,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      label: "Check-outs This Month",
      value: checkOutsThisMonth,
      icon: LogOut,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  return (
    <div>
      <Header
        title="Dashboard"
        subtitle="Welcome back! Here's an overview of your properties."
        user={{ name: session.user.name, email: session.user.email }}
      />
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Check-ins</CardTitle>
            </div>
            <Link href="/admin/properties">
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Guest Name
                    </th>
                    <th className="pb-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Property
                    </th>
                    <th className="pb-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Arrival
                    </th>
                    <th className="pb-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Departure
                    </th>
                    <th className="pb-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Guests
                    </th>
                    <th className="pb-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentCheckIns.map((checkIn) => (
                    <tr
                      key={checkIn.id}
                      className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-4 px-4 font-medium text-gray-900">
                        {checkIn.guestName}
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {checkIn.property.name}
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {new Date(checkIn.arrivalDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {new Date(checkIn.departureDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="secondary">{checkIn.numberOfGuests}</Badge>
                      </td>
                      <td className="py-4 px-4 text-gray-500 text-sm">
                        {new Date(checkIn.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {recentCheckIns.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-gray-500">
                        No check-ins yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

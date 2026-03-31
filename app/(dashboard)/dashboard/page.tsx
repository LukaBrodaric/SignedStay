import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Building2, LogIn, LogOut, ArrowRight } from "lucide-react";

export default async function ClientDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const userId = (session.user as any).id;

  const [propertyCount, checkInCount, checkOutCount, recentCheckIns] =
    await Promise.all([
      prisma.property.count({ where: { userId } }),
      prisma.checkIn.count({
        where: { property: { userId } },
      }),
      prisma.checkOut.count({
        where: { property: { userId } },
      }),
      prisma.checkIn.findMany({
        where: { property: { userId } },
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { property: true },
      }),
    ]);

  const stats = [
    {
      label: "Properties",
      value: propertyCount,
      icon: Building2,
      color: "from-indigo-500 to-purple-600",
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
    {
      label: "Total Check-ins",
      value: checkInCount,
      icon: LogIn,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      label: "Total Check-outs",
      value: checkOutCount,
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
        subtitle={`Welcome back, ${session.user.name}! Here's an overview of your properties.`}
        user={{ name: session.user.name, email: session.user.email }}
      />
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid gap-6 md:grid-cols-3 mb-8">
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
              <CardTitle>Recent Activity</CardTitle>
            </div>
            <Link href="/dashboard/properties">
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {recentCheckIns.length > 0 ? (
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
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mx-auto">
                  <Building2 className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-gray-500 mb-2">
                  No recent activity
                </p>
                <p className="text-sm text-gray-400">
                  Add properties and share check-in links with guests.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

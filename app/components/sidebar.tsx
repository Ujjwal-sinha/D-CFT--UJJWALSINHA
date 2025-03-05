import Link from "next/link"
import {
  Home,
  BarChart2,
  Leaf,
  Zap,
  DollarSign,
  TreeDeciduous,
  Settings,
  Building2,
  PiIcon as Api,
  FileCheck,
} from "lucide-react"

export function Sidebar() {
  return (
    <div className="w-64 bg-card text-card-foreground p-6">
      <h1 className="text-2xl font-bold mb-8">D-CFT</h1>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link href="/dashboard" className="flex items-center space-x-2 hover:text-primary">
              <Home size={20} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link href="/analysis" className="flex items-center space-x-2 hover:text-primary">
              <BarChart2 size={20} />
              <span>AI Analysis</span>
            </Link>
          </li>
          <li>
            <Link href="/blockchain" className="flex items-center space-x-2 hover:text-primary">
              <Leaf size={20} />
              <span>Blockchain Data</span>
            </Link>
          </li>
          <li>
            <Link href="/rewards" className="flex items-center space-x-2 hover:text-primary">
              <DollarSign size={20} />
              <span>Token Rewards</span>
            </Link>
          </li>
          <li>
            <Link href="/iot" className="flex items-center space-x-2 hover:text-primary">
              <Zap size={20} />
              <span>IoT Integration</span>
            </Link>
          </li>
          <li>
            <Link href="/offset-projects" className="flex items-center space-x-2 hover:text-primary">
              <TreeDeciduous size={20} />
              <span>Offset Projects</span>
            </Link>
          </li>
          <li>
            <Link href="/government" className="flex items-center space-x-2 hover:text-primary">
              <Building2 size={20} />
              <span>Government</span>
            </Link>
          </li>
          <li>
            <Link href="/government/api-dashboard" className="flex items-center space-x-2 hover:text-primary">
              <Api size={20} />
              <span>Gov API</span>
            </Link>
          </li>
          <li>
            <Link href="/government/impact-assessment" className="flex items-center space-x-2 hover:text-primary">
              <FileCheck size={20} />
              <span>Impact Assessment</span>
            </Link>
          </li>
          <li>
            <Link href="/settings" className="flex items-center space-x-2 hover:text-primary">
              <Settings size={20} />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}


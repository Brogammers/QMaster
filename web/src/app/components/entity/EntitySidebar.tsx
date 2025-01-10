import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { 
  FaCog, 
  FaDesktop, 
  FaUsers,
  FaSignOutAlt
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import QMasterLogo from "../../../../public/qmaster-logo.svg";
import { useRouter } from 'next/navigation';

interface EntitySidebarProps {
  isDarkMode: boolean;
}

export default function EntitySidebar({ isDarkMode }: EntitySidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { entity } = useParams();

  const menuItems = [
    {
      path: `/${entity}/admin/details`,
      label: 'Details',
      icon: FaCog,
      children: [
        { path: `/${entity}/admin/customer-feedback`, label: 'Customer Feedback' },
        { path: `/${entity}/admin/queues`, label: 'Queues' },
        { path: `/${entity}/admin/sharing-info`, label: 'Sharing Info' },
      ]
    },
    { path: `/${entity}/counter`, label: 'Counter', icon: FaUsers },
    { path: `/${entity}/display`, label: 'Display', icon: FaDesktop },
  ];

  const handleLogout = () => {
    router.replace('/login');
  };

  return (
    <div className="w-64 bg-gradient-to-b from-baby-blue to-ocean-blue text-white h-screen relative overflow-hidden">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      
      {/* Logo area */}
      <div className="relative p-6 border-b border-white/20 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Image
            src={QMasterLogo}
            alt="QMaster Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <h1 className="text-2xl font-bold text-white">
            QMaster
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative mt-6 space-y-1 px-3">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.path);
          const Icon = item.icon;

          return (
            <div key={item.path}>
              <Link href={item.path}>
                <motion.div
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                    transition-all duration-200 group relative
                    ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}
                  `}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl"
                      layoutId="activeTab"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <div className="relative flex items-center gap-3">
                    <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110`} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                </motion.div>
              </Link>
              {item.children && isActive && (
                <div className="ml-12 mt-2 space-y-1">
                  {item.children.map((child) => {
                    const isChildActive = pathname === child.path;
                    return (
                      <Link key={child.path} href={child.path}>
                        <motion.div
                          className={`
                            px-4 py-2 rounded-lg text-sm cursor-pointer
                            ${isChildActive ? 'text-white' : 'text-white/70 hover:text-white'}
                          `}
                          whileHover={{ x: 2 }}
                        >
                          {child.label}
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="absolute bottom-20 left-0 right-0 px-6">
        <motion.button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
            bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaSignOutAlt className="w-5 h-5" />
          <span>Sign Out</span>
        </motion.button>
      </div>
      
      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ocean-blue to-transparent pointer-events-none" />
    </div>
  );
} 
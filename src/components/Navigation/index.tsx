import React from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import ThemeButton from '../ThemeButton';
import Logo from '../Logo';
import StyledLink from '../Link';
import navigationStyle from './index.module.css';

const Separator = function () {
  return (
    <span className={navigationStyle.separator}>
      /
    </span>
  );
};

interface MenuItemProps {
  children: React.ReactNode;
  href: string;
  isAnchor?: boolean;
  'aria-label'?: string;
}

const MenuItem: React.FC<MenuItemProps> = function ({ children, href, isAnchor = false, ...props }) {
  const router = useRouter();
  const [activeSection, setActiveSection] = React.useState('');

  React.useEffect(() => {
    if (!isAnchor) return;

    const handleScroll = () => {
      const sections = ['about', 'experience', 'principles', 'contact'];
      const rightColumn = document.querySelector('.rightColumn') as HTMLElement;
      const scrollPosition = (rightColumn ? rightColumn.scrollTop : window.scrollY) + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    const rightColumn = document.querySelector('.rightColumn') as HTMLElement;
    if (rightColumn) {
      rightColumn.addEventListener('scroll', handleScroll);
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始检查
    return () => {
      if (rightColumn) {
        rightColumn.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isAnchor]);

  const handleClick = (e: React.MouseEvent) => {
    if (isAnchor) {
      e.preventDefault();
      if (href === '#') {
        // 滚动到页面顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const targetId = href.replace('#', '');
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isActive = isAnchor
    ? activeSection === href.replace('#', '')
    : router.pathname === href;

  return (
    <StyledLink
      className={classnames(navigationStyle.menuItem, {
        [navigationStyle.inactiveLink]: !isActive,
      })}
      inActive={!isActive}
      href={href}
      onClick={handleClick}
      {...props}
    >
      {children}
    </StyledLink>
  );
};

const Navigation: React.FunctionComponent = function () {
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  if (isHomePage) {
    // 首页使用锚点导航
    return (
      <nav className="flex align-center justify-between">
        <div className="flex align-center">
          <MenuItem href="#" isAnchor aria-label="Home">
            <Logo />
          </MenuItem>
          <Separator />
          <MenuItem href="#about" isAnchor>關於我</MenuItem>
          <Separator />
          <MenuItem href="#experience" isAnchor>經歷</MenuItem>
          <Separator />
          <MenuItem
            href="/files/%E5%94%90%E5%92%8C%E8%BE%89%20-%2018602149227.pdf"
            aria-label="Resume"
          >
            個人簡歷
          </MenuItem>
          <Separator />
          <MenuItem href="#principles" isAnchor>原則</MenuItem>
          <Separator />
          <MenuItem href="#contact" isAnchor>聯繫</MenuItem>
        </div>
        <ThemeButton />
      </nav>
    );
  }

  // 其他页面使用传统导航
  return (
    <nav className="flex align-center justify-between">
      <div className="flex align-center">
        <MenuItem href="/" aria-label="Home">
          <Logo />
        </MenuItem>
        <Separator />
        <MenuItem href="/about">個人簡介</MenuItem>
        <Separator />
        <MenuItem
          href="/files/%E5%94%90%E5%92%8C%E8%BE%89%20-%2018602149227.pdf"
          aria-label="Resume"
        >
          個人簡歷
        </MenuItem>
        <Separator />
        <MenuItem href="/work">工作</MenuItem>
        <Separator />
        <MenuItem href="/writings">文章</MenuItem>
      </div>
      <ThemeButton />
    </nav>
  );
};

export default Navigation;

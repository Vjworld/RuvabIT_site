import React, { useState, useEffect } from 'react';
import { Palette, Sun, Moon, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Theme = 'light' | 'dark' | 'system';
type ColorPalette = 'blue' | 'green' | 'purple' | 'orange';

const colorPalettes = {
  blue: {
    primary: 'hsl(221, 83%, 53%)',
    primaryForeground: 'hsl(210, 40%, 98%)',
    secondary: 'hsl(210, 40%, 96%)',
    accent: 'hsl(210, 40%, 94%)',
  },
  green: {
    primary: 'hsl(142, 76%, 36%)',
    primaryForeground: 'hsl(355, 25%, 95%)',
    secondary: 'hsl(120, 60%, 96%)',
    accent: 'hsl(120, 60%, 94%)',
  },
  purple: {
    primary: 'hsl(262, 83%, 58%)',
    primaryForeground: 'hsl(210, 40%, 98%)',
    secondary: 'hsl(270, 60%, 96%)',
    accent: 'hsl(270, 60%, 94%)',
  },
  orange: {
    primary: 'hsl(24, 95%, 53%)',
    primaryForeground: 'hsl(60, 9%, 98%)',
    secondary: 'hsl(60, 4.8%, 95.9%)',
    accent: 'hsl(60, 4.8%, 95.9%)',
  },
};

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<Theme>('system');
  const [colorPalette, setColorPalette] = useState<ColorPalette>('blue');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedPalette = localStorage.getItem('colorPalette') as ColorPalette;
    
    if (savedTheme) setTheme(savedTheme);
    if (savedPalette) setColorPalette(savedPalette);
  }, []);

  useEffect(() => {
    applyTheme(theme);
    applyColorPalette(colorPalette);
  }, [theme, colorPalette]);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    if (newTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.toggle('dark', systemTheme === 'dark');
    } else {
      root.classList.toggle('dark', newTheme === 'dark');
    }
    
    localStorage.setItem('theme', newTheme);
  };

  const applyColorPalette = (palette: ColorPalette) => {
    const root = document.documentElement;
    const colors = colorPalettes[palette];
    
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
    
    localStorage.setItem('colorPalette', palette);
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const handleColorPaletteChange = (palette: ColorPalette) => {
    setColorPalette(palette);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return <Sun className="h-4 w-4" />;
      case 'dark': return <Moon className="h-4 w-4" />;
      default: return <Monitor className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Theme Switcher */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="w-9 h-9 p-0">
            {getThemeIcon()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleThemeChange('light')}>
            <Sun className="h-4 w-4 mr-2" />
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleThemeChange('dark')}>
            <Moon className="h-4 w-4 mr-2" />
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleThemeChange('system')}>
            <Monitor className="h-4 w-4 mr-2" />
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Color Palette Switcher */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="w-9 h-9 p-0">
            <Palette className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleColorPaletteChange('blue')}>
            <div className="w-4 h-4 rounded-full bg-blue-500 mr-2" />
            Blue
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleColorPaletteChange('green')}>
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2" />
            Green
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleColorPaletteChange('purple')}>
            <div className="w-4 h-4 rounded-full bg-purple-500 mr-2" />
            Purple
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleColorPaletteChange('orange')}>
            <div className="w-4 h-4 rounded-full bg-orange-500 mr-2" />
            Orange
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ThemeSwitcher;
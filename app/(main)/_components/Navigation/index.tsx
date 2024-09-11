"use client";

import { ChevronsLeft, MenuIcon, Plus, PlusCircle, Search, Settings, Trash } from 'lucide-react';
import { useSearch } from '@/hook/useSearch';
import { useSettings } from '@/hook/useSettings';
import React, { ElementRef } from 'react';
import { useMediaQuery } from '../../../../src/hook';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { CreateNewDocument } from '../../../../src/services/api/document';
import Item from '../Item';
import { toast } from 'sonner';
import DocumentList from '../DocumentList';
import UserItem from '../UserItem';
import { TrashBox } from '../TrashBox/TrashBox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Navbar } from '../Navbar/Navbar';

function Navigation() {
  const search = useSearch();
  const settings = useSettings();
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient()
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isResizingRef = React.useRef(false);
  const sidebarRef = React.useRef<ElementRef<'aside'>>(null);
  const navbarRef = React.useRef<ElementRef<'div'>>(null);
  const [isResetting, setIsResetting] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(isMobile);
  const { mutateAsync } = useMutation({
    mutationFn: CreateNewDocument,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['documents']
      })
      router.push(`/documents/${data.id}`)
    }
  });

  React.useEffect(() => {
    if (isMobile) collapse();
    else resetWidth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  React.useEffect(() => {
    if (isMobile) collapse();
  }, [pathname, isMobile]);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;
    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty('left', `${newWidth}px`);
      navbarRef.current.style.setProperty('width', `calc(100% - ${newWidth}px)`);
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? '100%' : '240px';
      navbarRef.current.style.setProperty('width', isMobile ? '0' : 'calc(100% - 240px)');
      navbarRef.current.style.setProperty('left', isMobile ? '100%' : '240px');
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = '0';
      navbarRef.current.style.setProperty('width', '100%');
      navbarRef.current.style.setProperty('left', '0');
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const onCreate = async () => {
    await toast.promise(
      mutateAsync({ title: 'Untitled' }),
      {
        loading: 'Creating a new note...',
        success: 'New note created!',
        error: 'Failed to create a new note.',
      }
    )
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={`group/sidebar relative z-[99999] flex h-full w-60 flex-col overflow-y-auto bg-secondary ${isResetting && 'transition-all duration-300 ease-in-out'} ${isMobile && 'w-0'}`}
      >
        <div
          onClick={collapse}
          role="button"
          className={`absolute right-2 top-3 h-6 w-6 rounded-sm text-muted-foreground opacity-0 transition hover:bg-neutral-300 group-hover/sidebar:opacity-100 dark:hover:bg-neutral-600 ${isMobile && 'opacity-100'}`}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>
        <div>
          <UserItem />
          <Item label="Search" icon={Search} isSearch onClick={search.onOpen} />
          <Item label="Settings" icon={Settings} onClick={settings.onOpen} />
          <Item onClick={onCreate} label="New page" icon={PlusCircle} />
        </div>
        <div className="mt-4">
          <DocumentList />
          <Item onClick={onCreate} icon={Plus} label="Add a page" />
          <Popover>
            <PopoverTrigger className="mt-4 w-full">
              <Item label="Trash" icon={Trash} />
            </PopoverTrigger>
            <PopoverContent className="w-72 p-0" side={isMobile ? 'bottom' : 'right'}>
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-primary/10 opacity-0 transition group-hover/sidebar:opacity-100"
        />
      </aside>
      <div
        ref={navbarRef}
        className={`w-[calc(100% - 240px)] absolute left-60 top-0 z-[99999] ${isResetting && 'transition-all duration-300 ease-in-out'} ${isMobile && 'left-0 w-full'}`}
      >
        {!!params.documentId ? (
          <Navbar 
            isCollapsed={isCollapsed}
            onResetWidth={resetWidth}
          />
        ) : (
          <nav className="w-full bg-transparent px-3 py-2">
            {isCollapsed && (
              <MenuIcon onClick={resetWidth} className="h-6 w-6 text-muted-foreground" />
            )}
          </nav>
        )}
      </div>
    </>
  );
}

export default Navigation;

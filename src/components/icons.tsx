
import React from 'react';
import { ZapIcon } from './ZapIcon';
import { Loader2 as LucideLoader } from 'lucide-react';

const createIcon = (name) => React.forwardRef((props, ref) => <ZapIcon name={name} {...props} ref={ref} />);

const createRotatedIcon = (name, rotation) => React.forwardRef((props, ref) => (
    <ZapIcon name={name} {...props} style={{ ...props.style, transform: `rotate(${rotation}deg)` }} ref={ref} />
));

export const Icons = {
    // Direct Mappings
    LayoutDashboard: createIcon('home'),
    Users: createIcon('affiliate'),
    Mail: createIcon('bell'),
    Zap: createIcon('zap'),
    Settings: createIcon('settings'),
    Search: createIcon('search'),
    ChevronRight: createIcon('chevronRight'),
    X: createIcon('close'),
    Menu: createIcon('menu'),
    Wallet: createIcon('wallet'),
    Bomb: createIcon('mines'),
    Dices: createIcon('game'),
    User: createIcon('user'),

    // Rotated Mappings
    ChevronLeft: createRotatedIcon('chevronRight', 180),
    ChevronDown: createRotatedIcon('chevronRight', 90),
    ChevronUp: createRotatedIcon('chevronRight', -90),
    ArrowUp: createRotatedIcon('chevronRight', -90),
    ArrowDown: createRotatedIcon('chevronRight', 90),
    ArrowRight: createIcon('chevronRight'),
    ArrowLeft: createRotatedIcon('chevronRight', 180),
    
    // Semantic/Substitution Mappings
    Trophy: createIcon('stats'),
    Target: createIcon('zap'),
    Star: createIcon('game'),
    Percent: createIcon('zap'),
    Calculator: createIcon('settings'),
    Activity: createIcon('stats'),
    HelpCircle: createIcon('search'),
    BookOpen: createIcon('stats'),
    Edit: createIcon('settings'),
    Gift: createIcon('wallet'),
    LogOut: createIcon('close'),
    Shield: createIcon('settings'),
    CheckCircle: createIcon('zap'),
    Check: createIcon('zap'),
    Lock: createIcon('settings'),
    PieChart: createIcon('stats'),
    FileText: createIcon('stats'),
    MessageSquare: createIcon('bell'),
    Share: createIcon('affiliate'),
    Share2: createIcon('affiliate'),
    Filter: createIcon('zap'),
    AlertTriangle: createIcon('close'),
    Info: createIcon('bell'),
    Clock: createIcon('settings'),
    Flag: createIcon('settings'),
    Link: createIcon('settings'),
    Eye: createIcon('search'),
    EyeOff: createIcon('close'),
    Trash: createIcon('close'),
    Trash2: createIcon('close'),
    Globe: createIcon('home'),
    Camera: createIcon('settings'),
    Sliders: createIcon('zap'),
    SlidersHorizontal: createIcon('zap'),
    Database: createIcon('stats'),
    Crosshair: createIcon('zap'),
    Server: createIcon('stats'),
    Plus: createIcon('zap'),
    ExternalLink: createIcon('chevronRight'),
    GitMerge: createIcon('zap'),
    Repeat: createIcon('settings'),
    TrendingUp: createIcon('stats'),
    Github: createIcon('settings'),
    SearchX: createIcon('search'),
    Gauge: createIcon('stats'),
    XCircle: createIcon('close'),
    Scan: createIcon('search'),
    Cpu: createIcon('settings'),
    Gavel: createIcon('settings'),
    Ghost: createIcon('user'),
    Grid: createIcon('mines'),
    Grid3x3: createIcon('mines'),
    Binary: createIcon('zap'),
    Gem: createIcon('plinko'),
    Terminal: createIcon('settings'),
    RefreshCw: createIcon('settings'),

    // Keep loader from lucide as no replacement was provided
    Loader: LucideLoader,
};

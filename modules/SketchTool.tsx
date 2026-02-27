
import React, { useRef, useState, useEffect } from 'react';
import { 
  Trash2, 
  Download, 
  Sparkles, 
  ArrowRight, 
  Box, 
  Hash, 
  RotateCcw, 
  Type as TypeIcon, 
  Layout, 
  Layers, 
  Info, 
  ChevronDown, 
  ChevronRight, 
  Settings, 
  Ruler, 
  ZoomIn,
  Square,
  Circle as CircleIcon,
  Triangle as TriangleIcon,
  MousePointer2,
  Activity,
  Minus,
  MessageSquare,
  Workflow,
  DoorOpen,
  Bed,
  Utensils,
  Droplets,
  Tag,
  Sofa,
  Monitor,
  Car,
  Trees,
  Briefcase,
  Lightbulb,
  Search,
  ExternalLink
} from 'lucide-react';
import { SceneObject, RoomDimensions } from '../types';
import { GoogleGenAI, Type } from "@google/genai";

type UnitType = 'm' | 'cm' | 'in';

const CONVERSIONS = {
  m: 1,
  cm: 100,
  in: 39.3701
};

const ASSETS_GROUPS = [
  {
    id: 'markers',
    label: 'Evidence Markers',
    icon: <Tag size={16} />,
    items: [
      { subType: 'Marker E1', icon: <div className="font-black text-[10px]">E1</div>, label: 'Marker E1', w: 0.25, d: 0.25, color: '#f59e0b', type: 'Marker', evidenceId: 'E1' },
      { subType: 'Marker E2', icon: <div className="font-black text-[10px]">E2</div>, label: 'Marker E2', w: 0.25, d: 0.25, color: '#f59e0b', type: 'Marker', evidenceId: 'E2' },
      { subType: 'Marker E3', icon: <div className="font-black text-[10px]">E3</div>, label: 'Marker E3', w: 0.25, d: 0.25, color: '#f59e0b', type: 'Marker', evidenceId: 'E3' },
      { subType: 'Marker E4', icon: <div className="font-black text-[10px]">E4</div>, label: 'Marker E4', w: 0.25, d: 0.25, color: '#f59e0b', type: 'Marker', evidenceId: 'E4' },
      { subType: 'Marker E5', icon: <div className="font-black text-[10px]">E5</div>, label: 'Marker E5', w: 0.25, d: 0.25, color: '#f59e0b', type: 'Marker', evidenceId: 'E5' },
      { subType: 'Marker E6', icon: <div className="font-black text-[10px]">E6</div>, label: 'Marker E6', w: 0.25, d: 0.25, color: '#f59e0b', type: 'Marker', evidenceId: 'E6' },
    ]
  },
  {
    id: 'text',
    label: 'Text',
    icon: <TypeIcon size={16} />,
    items: [
      { subType: 'Label', icon: <TypeIcon size={18} />, label: 'Text Label', w: 1, d: 0.4, color: '#475569', type: 'Label' },
    ]
  },
  {
    id: 'shapes',
    label: 'Basic Drawing Shapes',
    icon: <Square size={16} />,
    items: [
      { subType: 'Rectangle', icon: <Square size={18} />, label: 'Rectangle', w: 1, d: 1, color: '#94a3b8', type: 'Furniture' },
      { subType: 'Circle', icon: <CircleIcon size={18} />, label: 'Circle', w: 1, d: 1, color: '#94a3b8', type: 'Furniture' },
      { subType: 'Triangle', icon: <TriangleIcon size={18} />, label: 'Triangle', w: 1, d: 1, color: '#94a3b8', type: 'Furniture' },
    ]
  },
  {
    id: 'living',
    label: 'Living Room',
    icon: <Sofa size={16} />,
    items: [
      { subType: 'Sofa', icon: <Sofa size={18} />, label: 'Sofa', w: 2.2, d: 0.9, color: '#64748b', type: 'Furniture' },
      { subType: 'Coffee Table', icon: <div className="w-5 h-3 border border-slate-400 rounded-sm" />, label: 'Coffee Table', w: 1.2, d: 0.6, color: '#94a3b8', type: 'Furniture' },
      { subType: 'Armchair', icon: <div className="w-4 h-4 border-2 border-slate-400 rounded-lg" />, label: 'Armchair', w: 0.9, d: 0.9, color: '#64748b', type: 'Furniture' },
      { subType: 'TV Stand', icon: <div className="w-5 h-2 bg-slate-800" />, label: 'TV Stand', w: 1.8, d: 0.4, color: '#1e293b', type: 'Furniture' },
    ]
  },
  {
    id: 'office',
    label: 'Office & Study',
    icon: <Briefcase size={16} />,
    items: [
      { subType: 'Office Desk', icon: <div className="w-5 h-3 border-b-4 border-slate-600" />, label: 'Desk', w: 1.6, d: 0.8, color: '#475569', type: 'Furniture' },
      { subType: 'Office Chair', icon: <CircleIcon size={16} />, label: 'Task Chair', w: 0.6, d: 0.6, color: '#64748b', type: 'Furniture' },
      { subType: 'Bookshelf', icon: <Layers size={18} />, label: 'Bookshelf', w: 0.8, d: 0.3, color: '#475569', type: 'Furniture' },
      { subType: 'Cabinet', icon: <Box size={18} />, label: 'Filing Cabinet', w: 0.5, d: 0.6, color: '#475569', type: 'Furniture' },
    ]
  },
  {
    id: 'outdoor',
    label: 'Outdoor & Vehicles',
    icon: <Car size={16} />,
    items: [
      { subType: 'Car', icon: <Car size={18} />, label: 'Vehicle', w: 4.5, d: 1.8, color: '#334155', type: 'Furniture' },
      { subType: 'Tree', icon: <Trees size={18} />, label: 'Tree/Bush', w: 1.2, d: 1.2, color: '#065f46', type: 'Furniture' },
      { subType: 'Fence', icon: <div className="w-6 h-1 bg-amber-900/40 border border-amber-900" />, label: 'Fence Section', w: 3, d: 0.1, color: '#78350f', type: 'Wall' },
      { subType: 'Street Lamp', icon: <Lightbulb size={18} />, label: 'Lamp Post', w: 0.4, d: 0.4, color: '#fcd34d', type: 'Furniture' },
    ]
  },
  {
    id: 'flowchart',
    label: 'Basic Flowchart Shapes',
    icon: <Workflow size={16} />,
    items: [
      { subType: 'Process', icon: <div className="w-4 h-3 border border-slate-400" />, label: 'Process', w: 1.5, d: 0.8, color: '#64748b', type: 'Furniture' },
      { subType: 'Decision', icon: <div className="w-3 h-3 border border-slate-400 rotate-45" />, label: 'Decision', w: 1.2, d: 1.2, color: '#64748b', type: 'Furniture' },
    ]
  },
  {
    id: 'doors',
    label: 'Doors and Windows',
    icon: <DoorOpen size={16} />,
    items: [
      { subType: 'Door', icon: <div className="w-4 h-4 border-l-2 border-b-2 border-slate-400 rounded-bl-full" />, label: 'Entrance', w: 1, d: 1, color: '#64748b', type: 'Wall' },
      { subType: 'Window', icon: <div className="w-4 h-1 bg-blue-100 border border-blue-300" />, label: 'Window', w: 1.5, d: 0.2, color: '#94a3b8', type: 'Wall' },
    ]
  },
  {
    id: 'structural',
    label: 'Wall Shell and Structure',
    icon: <Layers size={16} />,
    items: [
      { subType: 'Wall', icon: <Minus size={18} />, label: 'Wall Segment', w: 4, d: 0.2, color: '#1e293b', type: 'Wall' },
      { subType: 'Column', icon: <div className="w-3 h-3 bg-slate-800" />, label: 'Pillar', w: 0.4, d: 0.4, color: '#0f172a', type: 'Wall' },
    ]
  },
  {
    id: 'kitchen',
    label: 'Kitchen and Dining',
    icon: <Utensils size={16} />,
    items: [
      { subType: 'Dining Table', icon: <Square size={18} />, label: 'Table', w: 2, d: 1, color: '#94a3b8', type: 'Furniture' },
      { subType: 'Counter', icon: <div className="w-5 h-2 bg-slate-300 border border-slate-400" />, label: 'Countertop', w: 2.5, d: 0.6, color: '#cbd5e1', type: 'Furniture' },
    ]
  },
  {
    id: 'bedroom',
    label: 'Bedroom',
    icon: <Bed size={16} />,
    items: [
      { subType: 'Bed', icon: <Layout size={18} />, label: 'King Bed', w: 2, d: 2, color: '#94a3b8', type: 'Furniture' },
      { subType: 'Closet', icon: <Box size={18} />, label: 'Wardrobe', w: 1.5, d: 0.6, color: '#94a3b8', type: 'Furniture' },
    ]
  },
  {
    id: 'plumbing',
    label: 'Plumbing',
    icon: <Droplets size={16} />,
    items: [
      { subType: 'Toilet', icon: <div className="w-3 h-4 border border-slate-400 rounded-t-lg rounded-b-sm" />, label: 'Toilet', w: 0.5, d: 0.7, color: '#f1f5f9', type: 'Furniture' },
      { subType: 'Sink', icon: <div className="w-4 h-3 border border-slate-400 rounded-full" />, label: 'Wash Basin', w: 0.6, d: 0.5, color: '#f1f5f9', type: 'Furniture' },
    ]
  },
  {
    id: 'forensic',
    label: 'Forensic Investigation',
    icon: <Activity size={16} />,
    items: [
      { subType: 'Body', icon: '👤', label: 'Victim', w: 1.8, d: 0.6, color: '#ef4444', type: 'Marker' },
      { subType: 'Firearm', icon: '🔫', label: 'Weapon', w: 0.3, d: 0.2, color: '#334155', type: 'Marker' },
      { subType: 'Blood', icon: '🩸', label: 'Stain', w: 0.5, d: 0.5, color: '#b91c1c', type: 'Marker' },
      { subType: 'Shell Casing', icon: <Search size={18} />, label: 'Casing', w: 0.1, d: 0.05, color: '#b45309', type: 'Marker' },
      { subType: 'Footprint', icon: '👣', label: 'Impression', w: 0.3, d: 0.15, color: '#4b5563', type: 'Marker' },
      { subType: 'Marker', icon: <Hash size={18} />, label: 'Evidence Tag', w: 0.2, d: 0.2, color: '#f59e0b', type: 'Marker' },
    ]
  }
];

const SUPPORTED_SUBTYPES = ASSETS_GROUPS.flatMap(g => g.items.map(i => i.subType));

const SketchTool: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [room, setRoom] = useState<RoomDimensions>({ width: 12, length: 10 });
  const [objects, setObjects] = useState<SceneObject[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [unit, setUnit] = useState<UnitType>('m');
  const [pixelsPerMeter, setPixelsPerMeter] = useState(80);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    'markers': true,
    'living': true,
    'forensic': true
  });
  
  const padding = 120;

  const toUnit = (meters: number) => parseFloat((meters * CONVERSIONS[unit]).toFixed(2));
  const fromUnit = (val: number) => parseFloat((val / CONVERSIONS[unit]).toFixed(3));

  const toggleGroup = (id: string) => {
    setExpandedGroups(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const saved = localStorage.getItem('forenova_sketch_v4');
    if (saved) {
      const data = JSON.parse(saved);
      setObjects(data.objects);
      setRoom(data.room);
    } else {
      addObject('Body', 'Marker');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('forenova_sketch_v4', JSON.stringify({ objects, room }));
    draw();
  }, [room, objects, selectedId, pixelsPerMeter, unit]);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = room.width * pixelsPerMeter + padding * 2;
    canvas.height = room.length * pixelsPerMeter + padding * 2.5;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const startX = padding;
    const startY = padding;
    const floorW = room.width * pixelsPerMeter;
    const floorH = room.length * pixelsPerMeter;

    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let x = 0; x <= room.width; x++) {
      ctx.beginPath();
      ctx.moveTo(startX + x * pixelsPerMeter, startY);
      ctx.lineTo(startX + x * pixelsPerMeter, startY + floorH);
      ctx.stroke();
      if (x % 1 === 0) {
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px JetBrains Mono';
        ctx.fillText(`${toUnit(x)}${unit}`, startX + x * pixelsPerMeter, startY - 10);
      }
    }
    for (let y = 0; y <= room.length; y++) {
      ctx.beginPath();
      ctx.moveTo(startX, startY + y * pixelsPerMeter);
      ctx.lineTo(startX + floorW, startY + y * pixelsPerMeter);
      ctx.stroke();
      if (y % 1 === 0) {
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px JetBrains Mono';
        ctx.fillText(`${toUnit(y)}${unit}`, startX - 45, startY + y * pixelsPerMeter + 4);
      }
    }

    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 4;
    ctx.strokeRect(startX, startY, floorW, floorH);

    objects.forEach((obj) => {
      ctx.save();
      const drawX = startX + obj.x * pixelsPerMeter;
      const drawY = startY + obj.y * pixelsPerMeter;
      const drawW = obj.width * pixelsPerMeter;
      const drawD = obj.depth * pixelsPerMeter;

      ctx.translate(drawX, drawY);
      ctx.rotate((obj.rotation * Math.PI) / 180);

      if (selectedId === obj.id) {
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgba(59, 130, 246, 0.5)';
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 3;
        ctx.strokeRect(-drawW/2 - 6, -drawD/2 - 6, drawW + 12, drawD + 12);
        ctx.shadowBlur = 0;
      }

      ctx.fillStyle = obj.color + '30';
      ctx.strokeStyle = obj.color;
      ctx.lineWidth = 2.5;

      switch(obj.subType) {
        case 'Body':
          ctx.beginPath();
          ctx.ellipse(0, 0, drawW/2, drawD/2, 0, 0, Math.PI * 2);
          ctx.stroke(); ctx.fill();
          ctx.beginPath(); ctx.arc(0, -drawD/3, drawW/4, 0, Math.PI * 2); ctx.stroke();
          break;
        case 'Circle':
        case 'Tree':
          ctx.beginPath();
          ctx.ellipse(0, 0, drawW/2, drawD/2, 0, 0, Math.PI * 2);
          ctx.stroke(); ctx.fill();
          break;
        case 'Triangle':
          ctx.beginPath();
          ctx.moveTo(0, -drawD/2);
          ctx.lineTo(drawW/2, drawD/2);
          ctx.lineTo(-drawW/2, drawD/2);
          ctx.closePath();
          ctx.stroke(); ctx.fill();
          break;
        case 'Decision':
          ctx.beginPath();
          ctx.moveTo(0, -drawD/2);
          ctx.lineTo(drawW/2, 0);
          ctx.lineTo(0, drawD/2);
          ctx.lineTo(-drawW/2, 0);
          ctx.closePath();
          ctx.stroke(); ctx.fill();
          break;
        case 'Label':
          ctx.fillStyle = obj.color;
          ctx.font = `bold ${Math.max(12, drawD * 0.8)}px Inter`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(obj.label, 0, 0);
          break;
        case 'Wall':
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(-drawW/2, -drawD/2, drawW, drawD);
          break;
        case 'Blood':
          ctx.fillStyle = '#b91c1cb0';
          ctx.beginPath();
          for(let i=0; i<8; i++) {
            const angle = (i/8) * Math.PI * 2;
            const r = (drawW/2) * (0.6 + Math.random() * 0.4);
            ctx.lineTo(Math.cos(angle)*r, Math.sin(angle)*r);
          }
          ctx.closePath(); ctx.fill();
          break;
        case 'Car':
          ctx.beginPath();
          ctx.roundRect(-drawW/2, -drawD/2, drawW, drawD, 5);
          ctx.stroke(); ctx.fill();
          ctx.fillStyle = '#000';
          ctx.fillRect(-drawW/2.2, -drawD/2 - 2, drawW/5, 4);
          ctx.fillRect(drawW/4, -drawD/2 - 2, drawW/5, 4);
          ctx.fillRect(-drawW/2.2, drawD/2 - 2, drawW/5, 4);
          ctx.fillRect(drawW/4, drawD/2 - 2, drawW/5, 4);
          break;
        default:
          if (obj.subType.startsWith('Marker E')) {
             ctx.beginPath();
             ctx.arc(0, 0, drawW/2, 0, Math.PI * 2);
             ctx.stroke();
             ctx.fillStyle = '#f59e0b30';
             ctx.fill();
          } else {
             ctx.strokeRect(-drawW/2, -drawD/2, drawW, drawD);
             ctx.fill();
          }
      }

      if (obj.evidenceId) {
        ctx.restore();
        ctx.save();
        ctx.translate(drawX, drawY);
        ctx.beginPath();
        ctx.arc(drawW/2 + 15, -drawD/2 - 15, 12, 0, Math.PI * 2);
        ctx.fillStyle = '#f59e0b'; ctx.fill();
        ctx.fillStyle = '#fff'; ctx.font = 'bold 11px Inter'; ctx.textAlign = 'center';
        ctx.fillText(obj.evidenceId, drawW/2 + 15, -drawD/2 - 11);
      }

      ctx.restore();
    });

    const legendY = startY + floorH + 60;
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 14px Inter';
    ctx.fillText('FORENSIC EVIDENCE', startX, legendY);
    
    objects.filter(o => o.evidenceId).forEach((obj, idx) => {
      const lx = startX + (idx % 3) * 240;
      const ly = legendY + 30 + Math.floor(idx / 3) * 25;
      ctx.fillStyle = '#475569';
      ctx.font = '11px JetBrains Mono';
      ctx.fillText(`${obj.evidenceId}: ${obj.label.toUpperCase()} (x:${toUnit(obj.x)}${unit}, y:${toUnit(obj.y)}${unit})`, lx, ly);
    });
  };

  const addObject = (subType: string, type: string) => {
    const allItems = ASSETS_GROUPS.flatMap(g => g.items);
    const asset = allItems.find(a => a.subType === subType);
    
    let finalEvidenceId = (asset as any)?.evidenceId;
    if (!finalEvidenceId && type === 'Marker') {
      finalEvidenceId = `E${objects.filter(o => o.evidenceId).length + 1}`;
    }

    const newObj: SceneObject = {
      id: Date.now().toString(),
      type: type as any,
      subType: subType,
      label: asset?.label || subType,
      x: room.width / 2,
      y: room.length / 2,
      width: asset?.w || 1,
      depth: asset?.d || 1,
      rotation: 0,
      color: asset?.color || '#000',
      evidenceId: finalEvidenceId
    };
    setObjects(prev => [...prev, newObj]);
    setSelectedId(newObj.id);
  };

  const deleteSelected = () => {
    if (selectedId) {
      setObjects(prev => prev.filter(o => o.id !== selectedId));
      setSelectedId(null);
    }
  };

  const updateObject = (id: string, updates: Partial<SceneObject>) => {
    setObjects(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left - padding) / pixelsPerMeter;
    const mouseY = (e.clientY - rect.top - padding) / pixelsPerMeter;

    const clicked = [...objects].reverse().find(obj => (
      mouseX >= obj.x - obj.width / 2 &&
      mouseX <= obj.x + obj.width / 2 &&
      mouseY >= obj.y - obj.depth / 2 &&
      mouseY <= obj.y + obj.depth / 2
    ));

    if (clicked) {
      setSelectedId(clicked.id);
      setIsDragging(true);
      setDragOffset({ x: mouseX - clicked.x, y: mouseY - clicked.y });
    } else {
      setSelectedId(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedId) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left - padding) / pixelsPerMeter;
    const mouseY = (e.clientY - rect.top - padding) / pixelsPerMeter;
    
    const snappedX = Math.round((mouseX - dragOffset.x) * 10) / 10;
    const snappedY = Math.round((mouseY - dragOffset.y) * 10) / 10;
    
    updateObject(selectedId, { x: snappedX, y: snappedY });
  };

  const generateAI = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const systemInstruction = `You are a professional Forensic Scene Architect. 
      Your task is to generate a realistic crime scene layout based on a user's description.
      
      RULES:
      1. Always prioritize using the provided list of supported subTypes.
      2. If the user describes relationships like 'facing', 'next to', or 'under', adjust the (x, y) coordinates and rotation accordingly.
      3. Coordinates (x, y) represent the center of the object. (0,0) is top-left.
      4. Ensure all objects are within the room dimensions.
      5. Room dimensions (width, length) should be reasonable (e.g., 8-20 meters).
      6. Use rotation (0-360) to orient furniture realistically.
      7. Use the 'evidenceId' field for items specified as evidence (e.g., E1, E2).
      
      SUPPORTED SUBTYPES:
      ${SUPPORTED_SUBTYPES.join(', ')}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a forensic scene sketch for: "${prompt}"`,
        config: { 
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              room: {
                type: Type.OBJECT,
                properties: {
                  width: { type: Type.NUMBER, description: 'Room width in meters' },
                  length: { type: Type.NUMBER, description: 'Room length in meters' }
                },
                required: ['width', 'length']
              },
              objects: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    type: { type: Type.STRING, enum: ['Marker', 'Wall', 'Furniture', 'Path', 'Label'] },
                    subType: { type: Type.STRING, description: 'Must be from the supported subtypes list if possible' },
                    label: { type: Type.STRING },
                    x: { type: Type.NUMBER, description: 'X coordinate in meters (center)' },
                    y: { type: Type.NUMBER, description: 'Y coordinate in meters (center)' },
                    width: { type: Type.NUMBER, description: 'Width in meters' },
                    depth: { type: Type.NUMBER, description: 'Depth/length in meters' },
                    rotation: { type: Type.NUMBER, description: 'Rotation in degrees (0-360)' },
                    color: { type: Type.STRING, description: 'Hex color code' },
                    evidenceId: { type: Type.STRING, description: 'Optional ID like E1, E2' }
                  },
                  required: ['type', 'subType', 'label', 'x', 'y', 'width', 'depth', 'rotation', 'color']
                }
              }
            },
            required: ['room', 'objects']
          }
        }
      });

      const data = JSON.parse(response.text);
      
      // Clean up IDs and colors
      const processedObjects = data.objects.map((o: any, i: number) => {
        const itemConfig = ASSETS_GROUPS.flatMap(g => g.items).find(asset => asset.subType === o.subType);
        return {
          ...o,
          id: `ai-${Date.now()}-${i}`,
          color: itemConfig?.color || o.color || '#334155'
        };
      });

      setRoom(data.room);
      setObjects(processedObjects);
      setSelectedId(null);
    } catch (e) { 
      console.error("AI Generation Error:", e);
    } finally { 
      setIsGenerating(false); 
    }
  };

  const selectedObj = objects.find(o => o.id === selectedId);

  return (
    <div className="flex flex-col gap-6 h-full max-w-[1800px] mx-auto pb-10 px-4 lg:px-0">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-6">
          <div className="p-4 bg-blue-600/10 rounded-2xl border border-blue-500/20 text-blue-500">
             <Sparkles size={28} className={isGenerating ? 'animate-spin' : ''} />
          </div>
          <div className="flex-1">
             <div className="flex items-center justify-between mb-2">
                <h2 className="text-white font-bold text-lg">ForeNova Scene Intelligence</h2>
                <a 
                  href="https://crime-scene-ai.preview.emergentagent.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[10px] font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-widest bg-blue-400/10 px-3 py-1.5 rounded-lg border border-blue-400/20"
                >
                  <ExternalLink size={12} /> Try 3D Scene AI
                </a>
             </div>
             <div className="relative">
                <input 
                  type="text" 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe a crime scene layout (e.g., 'a cluttered office desk facing a large window with blood stains nearby')..."
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-6 pr-36 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <button 
                  onClick={generateAI}
                  disabled={isGenerating || !prompt.trim()}
                  className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 rounded-xl font-bold uppercase text-[10px] tracking-widest flex items-center gap-2"
                >
                  {isGenerating ? 'Drafting...' : 'Generate'} <ArrowRight size={14} />
                </button>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-[900px]">
        <div className="lg:col-span-3 flex flex-col gap-2 overflow-y-auto max-h-[900px] custom-scrollbar bg-slate-900/50 rounded-3xl border border-slate-800 p-4">
           {ASSETS_GROUPS.map((group) => (
             <div key={group.id} className="border-b border-slate-800/50 last:border-0">
               <button 
                 onClick={() => toggleGroup(group.id)}
                 className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors rounded-xl group"
               >
                 <div className="flex items-center gap-3">
                    <span className="text-slate-400 group-hover:text-blue-400 transition-colors">{group.icon}</span>
                    <span className="text-xs font-bold text-slate-300">{group.label}</span>
                 </div>
                 {expandedGroups[group.id] ? <ChevronDown size={14} className="text-slate-500" /> : <ChevronRight size={14} className="text-slate-500" />}
               </button>
               
               {expandedGroups[group.id] && (
                 <div className="grid grid-cols-2 gap-2 p-2 pt-0 animate-in slide-in-from-top-2 duration-200">
                   {group.items.map((item) => (
                     <button 
                        key={item.subType} 
                        onClick={() => addObject(item.subType, item.type)}
                        className="flex flex-col items-center gap-2 p-3 bg-slate-800/50 hover:bg-blue-600/20 hover:border-blue-500/50 border border-transparent rounded-xl transition-all group/item"
                      >
                        <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-slate-400 group-hover/item:text-white group-hover/item:bg-blue-600 transition-all overflow-hidden">
                          {typeof item.icon === 'string' ? <span className="text-xl">{item.icon}</span> : item.icon}
                        </div>
                        <span className="text-[9px] font-bold text-slate-500 group-hover/item:text-slate-300 text-center uppercase tracking-tighter">{item.label}</span>
                     </button>
                   ))}
                 </div>
               )}
             </div>
           ))}
        </div>

        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-[3rem] overflow-auto shadow-2xl flex flex-col relative group scrollbar-thin">
           <div className="absolute top-8 left-8 z-10 flex gap-2">
              <div className="bg-blue-600/20 text-blue-400 px-4 py-2 rounded-xl border border-blue-500/20 text-[10px] font-black uppercase tracking-widest">Sketch Mode</div>
              <div className="bg-slate-900/80 text-slate-500 px-4 py-2 rounded-xl border border-white/5 text-[10px] font-bold uppercase tracking-widest">Grid: 1.0m</div>
           </div>

           <div className="absolute top-8 right-8 z-10 flex bg-slate-900 rounded-xl border border-slate-800 p-1">
              <button onClick={() => setPixelsPerMeter(p => Math.max(40, p - 10))} className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors"><RotateCcw size={16} /></button>
              <div className="px-3 flex items-center text-[10px] font-bold text-slate-500 uppercase">Zoom</div>
              <button onClick={() => setPixelsPerMeter(p => Math.min(150, p + 10))} className="p-2 hover:bg-blue-600 text-slate-400 hover:text-white rounded-lg transition-colors"><ZoomIn size={16} /></button>
           </div>
           
           <div className="flex-1 flex items-start justify-start p-12 min-w-max min-h-max">
              <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={() => setIsDragging(false)}
                className="shadow-[0_0_120px_rgba(0,0,0,0.6)] cursor-crosshair bg-white"
              />
           </div>

           <div className="p-8 bg-slate-900/80 border-t border-white/5 flex justify-between items-center sticky bottom-0 z-20">
              <div className="flex items-center gap-8">
                 <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Room Width</span>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setRoom(r => ({...r, width: Math.max(5, r.width-1)}))} className="w-8 h-8 bg-slate-800 rounded-lg hover:bg-slate-700">-</button>
                        <span className="text-xs font-black text-white w-14 text-center">{toUnit(room.width)}{unit}</span>
                        <button onClick={() => setRoom(r => ({...r, width: r.width+1}))} className="w-8 h-8 bg-slate-800 rounded-lg hover:bg-slate-700">+</button>
                    </div>
                 </div>
                 <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Room Length</span>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setRoom(r => ({...r, length: Math.max(5, r.length-1)}))} className="w-8 h-8 bg-slate-800 rounded-lg hover:bg-slate-700">-</button>
                        <span className="text-xs font-black text-white w-14 text-center">{toUnit(room.length)}{unit}</span>
                        <button onClick={() => setRoom(r => ({...r, length: r.length+1}))} className="w-8 h-8 bg-slate-800 rounded-lg hover:bg-slate-700">+</button>
                    </div>
                 </div>
              </div>
              <button 
                onClick={() => {
                  const canvas = canvasRef.current;
                  if (!canvas) return;
                  const link = document.createElement('a');
                  link.download = `Forensic_Sketch.png`;
                  link.href = canvas.toDataURL();
                  link.click();
                }}
                className="flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-50 transition-all shadow-2xl active:scale-95"
              >
                <Download size={18} /> Export
              </button>
           </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
           {selectedObj ? (
             <div className="bg-slate-900 border-2 border-blue-500/30 p-8 rounded-[2.5rem] shadow-2xl space-y-8 animate-in slide-in-from-right-4 duration-300">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                         <Settings size={20} />
                      </div>
                      <h3 className="font-bold text-white text-sm uppercase tracking-tight">Properties</h3>
                   </div>
                   <button onClick={deleteSelected} className="p-3 bg-rose-600/10 text-rose-500 hover:bg-rose-600 hover:text-white rounded-xl transition-all">
                      <Trash2 size={18} />
                   </button>
                </div>

                <div className="space-y-6 overflow-y-auto max-h-[700px] pr-2 custom-scrollbar">
                   <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                         <Ruler size={10} /> Units
                      </label>
                      <div className="grid grid-cols-3 gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
                         {(['m', 'cm', 'in'] as UnitType[]).map((u) => (
                           <button 
                             key={u}
                             onClick={() => setUnit(u)}
                             className={`py-2 rounded-lg text-[9px] font-bold uppercase transition-all ${unit === u ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:bg-white/5'}`}
                           >
                             {u}
                           </button>
                         ))}
                      </div>
                   </div>

                   <div className="space-y-4">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Identification</label>
                      <div className="space-y-4">
                         <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                            <p className="text-[8px] text-slate-600 uppercase mb-1">Label</p>
                            <input 
                              type="text" 
                              value={selectedObj.label} 
                              onChange={(e) => updateObject(selectedObj.id, { label: e.target.value })}
                              className="bg-transparent text-xs font-bold text-white outline-none w-full"
                            />
                         </div>
                         <div className="grid grid-cols-2 gap-2">
                           <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                              <p className="text-[8px] text-slate-600 uppercase mb-1">Type</p>
                              <p className="text-[10px] font-bold text-white">{selectedObj.subType}</p>
                           </div>
                           {selectedObj.evidenceId && (
                             <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                                <p className="text-[8px] text-slate-600 uppercase mb-1">ID Tag</p>
                                <input 
                                  type="text" 
                                  value={selectedObj.evidenceId} 
                                  onChange={(e) => updateObject(selectedObj.id, { evidenceId: e.target.value })}
                                  className="bg-transparent text-[10px] font-bold text-blue-400 outline-none w-full"
                                />
                             </div>
                           )}
                         </div>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Transform</label>
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <span className="text-[9px] text-slate-500 uppercase">Coord X</span>
                              <input 
                                type="number" step="0.01"
                                value={toUnit(selectedObj.x)}
                                onChange={(e) => updateObject(selectedObj.id, { x: fromUnit(parseFloat(e.target.value) || 0) })}
                                className="w-full bg-black/40 p-3 rounded-lg border border-white/5 text-xs text-white"
                              />
                           </div>
                           <div className="space-y-2">
                              <span className="text-[9px] text-slate-500 uppercase">Coord Y</span>
                              <input 
                                type="number" step="0.01"
                                value={toUnit(selectedObj.y)}
                                onChange={(e) => updateObject(selectedObj.id, { y: fromUnit(parseFloat(e.target.value) || 0) })}
                                className="w-full bg-black/40 p-3 rounded-lg border border-white/5 text-xs text-white"
                              />
                           </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <span className="text-[9px] text-slate-500 uppercase">Width</span>
                              <input 
                                type="number" step="0.01"
                                value={toUnit(selectedObj.width)}
                                onChange={(e) => updateObject(selectedObj.id, { width: fromUnit(parseFloat(e.target.value) || 0.1) })}
                                className="w-full bg-black/40 p-3 rounded-lg border border-white/5 text-xs text-white"
                              />
                           </div>
                           <div className="space-y-2">
                              <span className="text-[9px] text-slate-500 uppercase">Length</span>
                              <input 
                                type="number" step="0.01"
                                value={toUnit(selectedObj.depth)}
                                onChange={(e) => updateObject(selectedObj.id, { depth: fromUnit(parseFloat(e.target.value) || 0.1) })}
                                className="w-full bg-black/40 p-3 rounded-lg border border-white/5 text-xs text-white"
                              />
                           </div>
                        </div>

                        <div className="space-y-3">
                           <div className="flex justify-between text-[10px] text-slate-400">
                              <span>Rotate</span>
                              <span className="font-mono text-blue-400">{selectedObj.rotation}°</span>
                           </div>
                           <input 
                             type="range" min="0" max="360" 
                             value={selectedObj.rotation} 
                             onChange={(e) => updateObject(selectedObj.id, { rotation: parseInt(e.target.value) })}
                             className="w-full accent-blue-600 h-1 bg-slate-800 rounded-full"
                           />
                        </div>
                      </div>
                   </div>

                   <div className="bg-blue-600/5 p-6 rounded-2xl border border-blue-500/10 space-y-3">
                      <h4 className="text-[9px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-2">
                         <Info size={12} /> Pro Tip
                      </h4>
                      <p className="text-[10px] text-slate-400 leading-relaxed italic">
                         Drag items on the canvas for quick layout adjustments or use the transform panel for precision.
                      </p>
                   </div>
                </div>
             </div>
           ) : (
             <div className="bg-slate-900 border border-slate-800 p-10 rounded-[2.5rem] h-full flex flex-col items-center justify-center text-center space-y-6 opacity-50 grayscale transition-all">
                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center text-slate-600">
                   <MousePointer2 size={32} />
                </div>
                <div>
                   <h3 className="font-bold text-white uppercase tracking-tight text-sm">Selection Board</h3>
                   <p className="text-[9px] text-slate-500 max-w-[150px] mx-auto mt-2 leading-relaxed">Select an object on the canvas to view high-precision parameters.</p>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default SketchTool;

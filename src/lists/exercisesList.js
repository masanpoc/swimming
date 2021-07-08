import { v4 as uuidv4 } from 'uuid';

const exercisesList = [
    {
        id: uuidv4(),
        name: '1 arm front - lateral kick fins',
        level: 3,
        stroke: 'freestyle',
        block: ['main', 'technique'],
        muscle: ['legs', 'abs'],
        material: ['fins'],
    },
    {
        id: uuidv4(),
        name: 'freestyle kick',
        level: 1,
        stroke: 'freestyle',
        block: ['main', 'technique', 'warmup', 'cooldown'],
        muscle: ['legs'],
        material: ['kickboard'],
    },
    {
        id: uuidv4(),
        name: 'medley',
        level: 4,
        stroke: 'all',
        block: ['main', 'warmup'],
        muscle: ['legs', 'abs', 'arms', 'pecs', 'back'],
        material: []
    },
    {
        id: uuidv4(),
        name: 'breaststroke with two kicks',
        level: 2,
        stroke: 'breaststroke',
        block: ['warmup', 'technique'],
        muscle: ['legs', 'pecs'],
        material: [],
    },
    {
        id: uuidv4(),
        name: 'breaststroke arms with butterfly kicks',
        level: 3,
        stroke: 'breaststroke',
        block: ['warmup', 'technique'],
        muscle: ['legs', 'abs', 'pecs'],
        material: [],
    },
    {
        id: uuidv4(),
        name: 'butterfly kick underwater with fins',
        level: 5,
        stroke: 'butterfly',
        block: ['technique', 'main'],
        muscle: ['legs', 'abs'],
        material: ['fins']
    },
    {
        id: uuidv4(),
        name: 'Closed-fist Freestyle',
        level: 2,
        stroke: 'freestyle',
        block: ['warmup', 'technique'],
        muscle: ['arms', 'back'],
        material: []
    },
    {
        id: uuidv4(),
        name: 'Head-up Freestyle',
        level: 3,
        stroke: 'freestyle',
        block: ['technique', 'technique'],
        muscle: ['arms', 'back', 'abs'],
        material: []
    },
    {
        id: uuidv4(),
        name: 'Underwater Freestyle with Fins',
        level: 5,
        stroke: 'freestyle',
        block: ['main'],
        muscle: ['arms', 'back', 'legs', 'abs'],
        material: ['fins']
    },
    {
        id: uuidv4(),
        name: 'Hand-drag Drill Freestyle',
        level: 2,
        stroke: 'freestyle',
        block: ['warmup', 'technique'],
        muscle: ['arms', 'back'],
        material: []
    },
    {
        id: uuidv4(),
        name: 'Freestyle with Dolphin Kicks (at the end)',
        level: 4,
        stroke: 'freestyle',
        block: ['technique', 'main'],
        muscle: ['arms', 'abs', 'pecs', 'back'],
        material: []
    },
    {
        id: uuidv4(),
        name: 'Sculling with pull-buoy freestyle',
        level: 2,
        stroke: 'freestyle',
        block: ['technique'],
        muscle: ['arms', 'back', 'pecs'],
        material: ['pullbuoy']
    },
    {
        id: uuidv4(),
        name: 'Dip (tension) & Kick Freestyle',
        level: 5,
        stroke: 'freestyle',
        block: ['main', 'technique'],
        muscle: ['arms', 'abs', 'back', 'pecs', 'legs'],
        material: ['fins', 'paddles', 'snorkel']
    },
    {
        id: uuidv4(),
        name: 'Catch-Up Freestyle',
        level: 3,
        stroke: 'freestyle',
        block: ['warmup', 'technique'],
        muscle: ['arms', 'back'],
        material: []
    },
    {
        id: uuidv4(),
        name: 'Freestyle Retraction (short) Drill with 1 paddle',
        level: 4,
        stroke: 'freestyle',
        block: ['technique', 'main'],
        muscle: ['arms', 'back', 'pecs', 'abs'],
        material: ['paddles', 'snorkel']
    },
    {
        id: uuidv4(),
        name: 'Breaststroke - Head above water',
        level: 2,
        stroke: 'breaststroke',
        block: ['technique'],
        muscle: ['abs', 'arms', 'pecs', 'legs'],
        material: []
    },
    {
        id: uuidv4(),
        name: 'Breaststroke with freestyle legs',
        level: 2,
        stroke: 'breaststroke',
        block: ['technique', 'warmup'],
        muscle: ['abs', 'arms'],
        material: []
    },
    {
        id: uuidv4(),
        name: 'Breaststroke with butterfly legs',
        level: 3,
        stroke: 'breaststroke',
        block: ['technique', 'warmup'],
        muscle: ['abs', 'arms', 'legs'],
        material: []
    },
    {
        id: uuidv4(),
        name: 'Breaststroke with leg kick variation 3x(freestyle/butterfly/breaststroke)',
        level: 3,
        stroke: 'breaststroke',
        block: ['warmup', 'technique'],
        muscle: ['arms', 'abs', 'legs'],
        material: []
    },
    {
        id: uuidv4(),
        name: 'Breaststroke Two Leg Kick',
        level: 1,
        stroke: 'breaststroke',
        block: ['technique', 'warmup'],
        muscle: ['abs', 'arms', 'legs'],
        material: []
    },
    {
        id: uuidv4(),
        name: 'Butterfly x 3/4 leg kicks with fins',
        level: 4,
        stroke: 'butterfly',
        block: ['technique', 'main'],
        muscle: ['abs', 'arms', 'legs', 'back'],
        material: ['fins']
    },
    {
        id: uuidv4(),
        name: 'Butterfly one arm only',
        level: 3,
        stroke: 'butterfly',
        block: ['technique', 'warmup'],
        muscle: ['abs', 'arms', 'legs', 'back'],
        material: []
    },
    {
        id: uuidv4(),
        name: 'Butterfly with breastroke legs (lateral breathing)',
        level: 3,
        stroke: 'butterfly',
        block: ['technique', 'warmup'],
        muscle: ['abs', 'arms', 'legs', 'back'],
        material: []
    },
    {
        id: uuidv4(),
        name: 'Butterfly with underwater recovery',
        level: 5,
        stroke: 'butterfly',
        block: ['technique'],
        muscle: ['abs', 'arms', 'legs', 'back'],
        material: []
    },
    {
        id: uuidv4(),
        name: 'Butterfly with clenched fists',
        level: 4,
        stroke: 'butterfly',
        block: ['technique', 'warmup'],
        muscle: ['abs', 'arms', 'legs', 'back'],
        material: []
    },
    {
        id: uuidv4(),
        name: 'Butterfly with one kick (at the end)',
        level: 3,
        stroke: 'butterfly',
        block: ['technique', 'warmup'],
        muscle: ['abs', 'arms', 'legs', 'back'],
        material: []
    },
    {
        id: uuidv4(),
        name: 'Backstroke using a kickboard & alterning stroke',
        level: 2,
        stroke: 'backstroke',
        block: ['technique', 'warmup'],
        muscle: ['arms', 'back', 'legs'],
        material: ['kickboard']
    },
    {
        id: uuidv4(),
        name: 'Backstroke one arm only',
        level: 1,
        stroke: 'backstroke',
        block: ['technique', 'warmup'],
        muscle: ['arms', 'back'],
        material: []
    },
    {
        id: uuidv4(),
        name: 'Backstroke with breaststroke legs',
        level: 3,
        stroke: 'backstroke',
        block: ['technique'],
        muscle: ['arms', 'back', 'legs'],
        material: []
    },
    {
        id: uuidv4(),
        name: 'Backstroke with pullbuoy in forehead',
        level: 3,
        stroke: 'backstroke',
        block: ['technique'],
        muscle: ['arms', 'back', 'abs'],
        material: ['pullbuoy']
    },
    {
        id: uuidv4(),
        name: 'Backstroke with fists clenched',
        level: 2,
        stroke: 'backstroke',
        block: ['technique', 'warmup'],
        muscle: ['arms', 'back'],
        material: []
    },
    {
        id: uuidv4(),
        name: 'Backstroke front crossovers 3 strokes + 3 cycles',
        level: 3,
        stroke: 'backstroke',
        block: ['technique'],
        muscle: ['arms', 'back'],
        material: []
    },
    {
        id: uuidv4(),
        name: 'Backstroke with slightly above knees pullbuoy',
        level: 1,
        stroke: 'backstroke',
        block: ['technique'],
        muscle: ['arms', 'back'],
        material: ['pullbuoy']
    },
    {
        id: uuidv4(),
        name: 'Backstroke, alternating one stroke + pause 1 second',
        level: 2,
        stroke: 'backstroke',
        block: ['technique', 'warmup'],
        muscle: ['arms', 'back'],
        material: []
    },
    {
        id: uuidv4(),
        name: 'Backstroke: alternating seated + two armed',
        level: 3,
        stroke: 'backstroke',
        block: ['technique'],
        muscle: ['arms', 'back'],
        material: []
    },
    {
        id: uuidv4(),
        name: 'Backstroke swap over using pullbuoy (hands)',
        level: 4,
        stroke: 'backstroke',
        block: ['technique'],
        muscle: ['arms', 'back', 'abs'],
        material: ['pullbuoy']
    },
    {
        id: uuidv4(),
        name: 'Freestyle breathing every 2 strokes',
        level: 1,
        stroke: 'freestyle',
        block: ['main', 'warmup', 'cooldown'],
        muscle: ['arms', 'back'],
        material: []
    },
    {
        id: uuidv4(),
        name: 'Freestyle breathing every 3 strokes',
        level: 2,
        stroke: 'freestyle',
        block: ['main', 'warmup', 'cooldown'],
        muscle: ['arms', 'back'],
        material: []
    },
    {
        id: uuidv4(),
        name: 'Freestyle with ultra-fast flipturns ',
        level: 3,
        stroke: 'freestyle',
        block: ['main'],
        muscle: ['arms', 'back'],
        material: []
    },
    {
        id: uuidv4(),
        name: 'Freestyle balanced progression',
        level: 2,
        stroke: 'freestyle',
        block: ['main'],
        muscle: ['arms', 'back'],
        material: []
    },
    {
        id: uuidv4(),
        name: 'Freestyle hypoxic',
        level: 4,
        stroke: 'freestyle',
        block: ['main'],
        muscle: ['arms', 'back'],
        material: []
    },
    {
        id: uuidv4(),
        name: 'Freestyle with paddles',
        level: 3,
        stroke: 'freestyle',
        block: ['main'],
        muscle: ['arms', 'back', 'pecs'],
        material: ['paddles']
    },
    {
        id: uuidv4(),
        name: 'Freestyle with fins',
        level: 3,
        stroke: 'freestyle',
        block: ['main'],
        muscle: ['arms', 'back', 'legs'],
        material: ['fins']
    },
    {
        id: uuidv4(),
        name: 'Freestyle with paddles and fins',
        level: 3,
        stroke: 'freestyle',
        block: ['main'],
        muscle: ['arms', 'back', 'pecs', 'legs'],
        material: ['paddles', 'fins']
    },
    {
        id: uuidv4(),
        name: 'Freestyle with paddles and snorkel',
        level: 3,
        stroke: 'freestyle',
        block: ['main'],
        muscle: ['arms', 'back', 'pecs'],
        material: ['paddles', 'snorkel']
    },
    {
        id: uuidv4(),
        name: 'Freestyle with snorkel and fins',
        level: 3,
        stroke: 'freestyle',
        block: ['main'],
        muscle: ['arms', 'back', 'legs'],
        material: ['fins', 'snorkel']
    },
    {
        id: uuidv4(),
        name: 'Freestyle with snorkel',
        level: 3,
        stroke: 'freestyle',
        block: ['cooldown'],
        muscle: ['arms', 'back'],
        material: ['snorkel']
    },
    {
        id: uuidv4(),
        name: 'Backstroke',
        level: 1,
        stroke: 'backstroke',
        block: ['cooldown', 'warmup', 'main'],
        muscle: ['arms', 'back'],
        material: []
    },
    {
        id: uuidv4(),
        name: 'Breaststroke',
        level: 1,
        stroke: 'breaststroke',
        block: ['cooldown', 'warmup', 'main'],
        muscle: ['arms', 'back', 'pecs'],
        material: []
    },
    {
        id: uuidv4(),
        name: 'Butterfly',
        level: 5,
        stroke: 'butterfly',
        block: ['main'],
        muscle: ['arms', 'back', 'abs'],
        material: []
    },
    {
        id: uuidv4(),
        name: 'Butterfly with fins',
        level: 5,
        stroke: 'butterfly',
        block: ['main'],
        muscle: ['arms', 'back', 'abs'],
        material: ['fins']
    },
    {
        id: uuidv4(),
        name: 'Breaststroke kicking',
        level: 1,
        stroke: 'breaststroke',
        block: ['cooldown', 'warmup', 'technique'],
        muscle: ['legs'],
        material: ['kickboard']
    },
    {
        id: uuidv4(),
        name: 'Bow&Arrow freestyle with fins, 6 kicks',
        level: 4,
        stroke: 'freestyle',
        block: ['main', 'technique'],
        muscle: ['legs', 'arms', 'back', 'abs'],
        material: ['fins']
    },
    {
        id: uuidv4(),
        name: 'Kick switch - no arms',
        level: 3,
        stroke: 'freestyle',
        block: ['technique'],
        muscle: ['legs'],
        material: []
    },
    {
        id: uuidv4(),
        name: 'Singapore Freestyle (one stroke, one dog arm)',
        level: 4,
        stroke: 'freestyle',
        block: ['warmup', 'technique'],
        muscle: ['arms', 'back'],
        material: ['fins, snorkel']
    },
    {
        id: uuidv4(),
        name: 'Freestyle with kickboard between legs, touching kickboard',
        level: 1,
        stroke: 'freestyle',
        block: ['warmup', 'cooldown', 'technique'],
        muscle: ['arms', 'back'],
        material: ['kickboard']
    },
    {
        id: uuidv4(),
        name: 'Freestyle with pull-buoy between ankles',
        level: 2,
        stroke: 'freestyle',
        block: ['warmup', 'technique'],
        muscle: ['abs', 'arms', 'back'],
        material: ['pullbuoy']
    },
    {
        id: uuidv4(),
        name: 'Freestyle with hand extension/sliding 3seconds',
        level: 2,
        stroke: 'freestyle',
        block: ['warmup', 'technique', 'cooldown'],
        muscle: ['arms', 'back'],
        material: []
    },
    {
        id: uuidv4(),
        name: 'Finger drags surface',
        level: 3,
        stroke: 'freestyle',
        block: ['warmup', 'cooldown', 'technique'],
        muscle: ['arms', 'back', 'abs'],
        material: []
    },

]

export default exercisesList
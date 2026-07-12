-- Extend vehicles for detail page (gallery, specs, features, seller)

alter table public.vehicles
  add column if not exists version text not null default '',
  add column if not exists doors integer not null default 4,
  add column if not exists drivetrain text not null default '',
  add column if not exists power text not null default '',
  add column if not exists torque text not null default '',
  add column if not exists ipva text not null default '',
  add column if not exists images text[] not null default '{}',
  add column if not exists features text[] not null default '{}',
  add column if not exists seller_name text not null default 'WebCars Motors',
  add column if not exists seller_rating numeric(3, 1) not null default 4.8,
  add column if not exists seller_location text not null default 'São Paulo, SP',
  add column if not exists seller_phone text not null default '(11) 4000-0000';

-- Backfill cover into images when empty
update public.vehicles
set images = array[image_url]
where coalesce(cardinality(images), 0) = 0
  and image_url is not null
  and image_url <> '';

-- Enrich seed vehicles with full detail data
update public.vehicles set
  version = 'XRE',
  doors = 4,
  drivetrain = 'Dianteira',
  power = '177 cv',
  torque = '21,4 kgfm',
  ipva = 'Pago',
  images = array[
    'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=1200&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800&q=80&auto=format&fit=crop'
  ],
  features = array[
    'Ar-condicionado digital',
    'Apple CarPlay / Android Auto',
    'Câmera de ré',
    'Sensor de estacionamento',
    'Controle de estabilidade',
    'Rodas de liga leve',
    'Faróis em LED',
    'Bancos em tecido premium',
    'Keyless entry'
  ],
  description = 'Único dono, revisões em concessionária Toyota, garantia de fábrica vigente. Pintura original, sem sinistros. Interior impecável e pneus em ótimo estado.',
  seller_name = 'Premium Motors SP',
  seller_rating = 4.8,
  seller_location = 'São Paulo, SP',
  seller_phone = '(11) 3456-7890',
  image_url = 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=1200&q=80&auto=format&fit=crop'
where id = '00000000-0000-4000-8000-000000000001';

update public.vehicles set
  version = 'Touring',
  doors = 4,
  drivetrain = 'Dianteira',
  power = '155 cv',
  torque = '19,5 kgfm',
  ipva = 'Pago',
  images = array[
    'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80&auto=format&fit=crop'
  ],
  features = array[
    'Teto solar',
    'Bancos em couro',
    'Honda Sensing',
    'Central multimídia 9"',
    'Ar-condicionado dual zone',
    'Câmera de ré',
    'Faróis full LED',
    'Bancos elétricos',
    'Start/Stop'
  ],
  description = 'Civic Touring com teto solar, bancos em couro e pacote completo de segurança. Histórico de revisões na Honda, pronto para transferir.',
  seller_name = 'Honda Center Campinas',
  seller_rating = 4.7,
  seller_location = 'Campinas, SP',
  seller_phone = '(19) 3200-1122',
  image_url = 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=80&auto=format&fit=crop'
where id = '00000000-0000-4000-8000-000000000002';

update public.vehicles set
  version = 'Limited',
  doors = 4,
  drivetrain = 'Integral 4x4',
  power = '170 cv',
  torque = '35,7 kgfm',
  ipva = 'Pago',
  images = array[
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80&auto=format&fit=crop'
  ],
  features = array[
    'Tração 4x4',
    'Bancos em couro',
    'Teto solar panorâmico',
    'Câmera 360°',
    'Central multimídia 10,1"',
    'Ar-condicionado dual zone',
    'Assistente de estacionamento',
    'Faróis em LED',
    'Modo Off-Road'
  ],
  description = 'Limited 4x4 diesel com baixíssima quilometragem. Ideal para quem busca conforto urbano e capacidade off-road. Veículo reservado — consulte disponibilidade.',
  seller_name = 'Jeep Experience RJ',
  seller_rating = 4.9,
  seller_location = 'Rio de Janeiro, RJ',
  seller_phone = '(21) 2500-3344',
  image_url = 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&q=80&auto=format&fit=crop'
where id = '00000000-0000-4000-8000-000000000003';

update public.vehicles set
  version = 'Highline',
  doors = 4,
  drivetrain = 'Dianteira',
  power = '128 cv',
  torque = '20,4 kgfm',
  ipva = 'Pago',
  images = array[
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80&auto=format&fit=crop'
  ],
  features = array[
    'Ar-condicionado',
    'Direção elétrica',
    'Vidros elétricos',
    'Central multimídia',
    'Sensor de estacionamento',
    'Airbags laterais',
    'Controle de tração',
    'Rodas de liga leve'
  ],
  description = 'Polo Highline completo, pneus novos e revisões em dia. Veículo já vendido — mantido no estoque apenas para histórico.',
  seller_name = 'VW Sul Automóveis',
  seller_rating = 4.5,
  seller_location = 'Porto Alegre, RS',
  seller_phone = '(51) 3300-5566',
  image_url = 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&q=80&auto=format&fit=crop'
where id = '00000000-0000-4000-8000-000000000004';

update public.vehicles set
  version = 'XLT',
  doors = 4,
  drivetrain = 'Integral 4x4',
  power = '200 cv',
  torque = '50,9 kgfm',
  ipva = 'Pago',
  images = array[
    'https://images.unsplash.com/photo-1605893477799-b99e3b8b93fe?w=1200&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80&auto=format&fit=crop'
  ],
  features = array[
    'Tração 4x4',
    'Caçamba com proteção',
    'Central SYNC 4',
    'Ar-condicionado dual zone',
    'Câmera de ré',
    'Bancos em couro',
    'Faróis em LED',
    'Assistente de subida',
    'Tomada 12V na caçamba'
  ],
  description = 'Ranger XLT 4x4 diesel impecável, pouco rodada. Ideal para trabalho e lazer, com acabamento premium e baixa manutenção.',
  seller_name = 'Ford Curitiba Premium',
  seller_rating = 4.6,
  seller_location = 'Curitiba, PR',
  seller_phone = '(41) 3010-7788',
  image_url = 'https://images.unsplash.com/photo-1605893477799-b99e3b8b93fe?w=1200&q=80&auto=format&fit=crop'
where id = '00000000-0000-4000-8000-000000000005';

update public.vehicles set
  version = 'sDrive20i M Sport',
  doors = 4,
  drivetrain = 'Dianteira',
  power = '192 cv',
  torque = '28,5 kgfm',
  ipva = 'Pago',
  images = array[
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1616422285623-13ff0162193b?w=800&q=80&auto=format&fit=crop'
  ],
  features = array[
    'Pacote M Sport',
    'Ar-condicionado 2 zonas',
    'Apple CarPlay',
    'Câmera de ré',
    'Bancos esportivos',
    'Teto solar panorâmico',
    'Faróis LED adaptativos',
    'Painel digital',
    'Assistente de estacionamento'
  ],
  description = 'BMW X1 sDrive20i M Sport revisada em concessionária. Pacote esportivo, interior premium e histórico completo. Pintura original sem retoques.',
  seller_name = 'Premium Motors SP',
  seller_rating = 4.8,
  seller_location = 'São Paulo, SP',
  seller_phone = '(11) 3456-7890',
  image_url = 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80&auto=format&fit=crop'
where id = '00000000-0000-4000-8000-000000000006';

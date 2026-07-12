-- Seed de exemplo (ids estáveis para demos)

insert into public.vehicles (
  id, brand, model, year, price, km, fuel, transmission, color, plate,
  location, category, status, description, image_url
) values
  (
    '00000000-0000-4000-8000-000000000001',
    'Toyota', 'Corolla Cross', 2024, 189900, 12500, 'Flex', 'Automático', 'Branco', 'RGT-2024',
    'São Paulo, SP', 'SUV', 'available',
    'Único dono, revisões em concessionária, garantia de fábrica.',
    'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&q=80&auto=format&fit=crop'
  ),
  (
    '00000000-0000-4000-8000-000000000002',
    'Honda', 'Civic', 2023, 154000, 28000, 'Flex', 'CVT', 'Preto', 'HDA-1C23',
    'Campinas, SP', 'Sedã', 'available',
    'Touring, teto solar, bancos em couro.',
    'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&q=80&auto=format&fit=crop'
  ),
  (
    '00000000-0000-4000-8000-000000000003',
    'Jeep', 'Compass', 2024, 198500, 5200, 'Diesel', 'Automático', 'Cinza', 'JEP-4X44',
    'Rio de Janeiro, RJ', 'SUV', 'reserved',
    'Limited 4x4, baixíssima quilometragem.',
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&q=80&auto=format&fit=crop'
  ),
  (
    '00000000-0000-4000-8000-000000000004',
    'Volkswagen', 'Polo', 2023, 89900, 35000, 'Flex', 'Manual', 'Vermelho', 'VWP-0L03',
    'Porto Alegre, RS', 'Hatch', 'sold',
    'Highline, completo, pneus novos.',
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&q=80&auto=format&fit=crop'
  ),
  (
    '00000000-0000-4000-8000-000000000005',
    'Ford', 'Ranger', 2024, 289000, 8700, 'Diesel', 'Automático', 'Prata', 'FRD-RNGR',
    'Curitiba, PR', 'Picape', 'available',
    'XLT 4x4, diesel, impecável.',
    'https://images.unsplash.com/photo-1605893477799-b99e3b8b93fe?w=400&q=80&auto=format&fit=crop'
  ),
  (
    '00000000-0000-4000-8000-000000000006',
    'BMW', 'X1', 2023, 315000, 15300, 'Gasolina', 'Automático', 'Azul', 'BMW-X100',
    'São Paulo, SP', 'SUV', 'available',
    'sDrive20i, M Sport, revisada.',
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&q=80&auto=format&fit=crop'
  )
on conflict (id) do nothing;

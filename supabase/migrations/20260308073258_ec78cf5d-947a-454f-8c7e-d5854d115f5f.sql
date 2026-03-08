-- Update existing subscription to active premium
UPDATE public.subscriptions 
SET status = 'active', 
    paid_at = now(), 
    expires_at = '2099-12-31T23:59:59Z'
WHERE user_id = '82f62a59-1cc8-45d4-84cb-9c123335e16b' 
AND id = '20d658fe-a66a-4c81-b23b-ef8daa1721fd';

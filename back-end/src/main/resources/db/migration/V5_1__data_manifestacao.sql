ALTER TABLE public.manifestacao
    DROP COLUMN data_manifestacao;

ALTER TABLE public.manifestacao
    ADD COLUMN data_inicio_manifestacao date;

ALTER TABLE public.manifestacao
    ADD COLUMN data_final_manifestacao date;
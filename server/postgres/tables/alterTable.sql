BEGIN TRANSACTION;

CREATE INDEX index_show_id ON public.tvshow USING btree (show_id);

ALTER TABLE ONLY public.tvshow
    ADD CONSTRAINT tvshow_loggedingoogle_id_fkey FOREIGN KEY (loggedingoogle_id) REFERENCES public.users(google_id);


ALTER TABLE ONLY public.tvshow
    ADD CONSTRAINT tvshow_loggedinuser_id_fkey FOREIGN KEY (loggedinuser_id) REFERENCES public.users(user_id);
COMMIT;
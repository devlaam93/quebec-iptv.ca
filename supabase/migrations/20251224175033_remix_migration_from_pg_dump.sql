CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "plpgsql" WITH SCHEMA "pg_catalog";
CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";
BEGIN;

--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


SET default_table_access_method = heap;

--
-- Name: blog_posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blog_posts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    excerpt text NOT NULL,
    category text NOT NULL,
    slug text NOT NULL,
    content text NOT NULL,
    image_url text,
    read_time text DEFAULT '5 min'::text NOT NULL,
    published boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    meta_title text,
    meta_description text
);


--
-- Name: menu_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.menu_items (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    location text NOT NULL,
    label text NOT NULL,
    url text NOT NULL,
    order_index integer DEFAULT 0 NOT NULL,
    parent_id uuid,
    footer_column text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT menu_items_location_check CHECK ((location = ANY (ARRAY['header'::text, 'footer'::text])))
);


--
-- Name: page_blocks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.page_blocks (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    page_id uuid NOT NULL,
    block_type text NOT NULL,
    content jsonb DEFAULT '{}'::jsonb NOT NULL,
    order_index integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: pages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    meta_title text,
    meta_description text,
    published boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: site_settings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.site_settings (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    key text NOT NULL,
    value jsonb DEFAULT '{}'::jsonb NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: blog_posts blog_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_posts
    ADD CONSTRAINT blog_posts_pkey PRIMARY KEY (id);


--
-- Name: blog_posts blog_posts_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_posts
    ADD CONSTRAINT blog_posts_slug_key UNIQUE (slug);


--
-- Name: menu_items menu_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menu_items
    ADD CONSTRAINT menu_items_pkey PRIMARY KEY (id);


--
-- Name: page_blocks page_blocks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.page_blocks
    ADD CONSTRAINT page_blocks_pkey PRIMARY KEY (id);


--
-- Name: pages pages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_pkey PRIMARY KEY (id);


--
-- Name: pages pages_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_slug_key UNIQUE (slug);


--
-- Name: site_settings site_settings_key_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.site_settings
    ADD CONSTRAINT site_settings_key_key UNIQUE (key);


--
-- Name: site_settings site_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.site_settings
    ADD CONSTRAINT site_settings_pkey PRIMARY KEY (id);


--
-- Name: idx_menu_items_location; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_menu_items_location ON public.menu_items USING btree (location);


--
-- Name: idx_menu_items_order; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_menu_items_order ON public.menu_items USING btree (order_index);


--
-- Name: idx_page_blocks_order; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_page_blocks_order ON public.page_blocks USING btree (order_index);


--
-- Name: idx_page_blocks_page_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_page_blocks_page_id ON public.page_blocks USING btree (page_id);


--
-- Name: blog_posts update_blog_posts_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: menu_items update_menu_items_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_menu_items_updated_at BEFORE UPDATE ON public.menu_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: page_blocks update_page_blocks_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_page_blocks_updated_at BEFORE UPDATE ON public.page_blocks FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: pages update_pages_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON public.pages FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: site_settings update_site_settings_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: menu_items menu_items_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.menu_items
    ADD CONSTRAINT menu_items_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.menu_items(id) ON DELETE CASCADE;


--
-- Name: page_blocks page_blocks_page_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.page_blocks
    ADD CONSTRAINT page_blocks_page_id_fkey FOREIGN KEY (page_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: page_blocks Anyone can view blocks of published pages; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view blocks of published pages" ON public.page_blocks FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.pages
  WHERE ((pages.id = page_blocks.page_id) AND (pages.published = true)))));


--
-- Name: menu_items Anyone can view menu items; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view menu items" ON public.menu_items FOR SELECT USING (true);


--
-- Name: blog_posts Anyone can view published blog posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view published blog posts" ON public.blog_posts FOR SELECT USING ((published = true));


--
-- Name: pages Anyone can view published pages; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view published pages" ON public.pages FOR SELECT USING ((published = true));


--
-- Name: site_settings Anyone can view site settings; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view site settings" ON public.site_settings FOR SELECT USING (true);


--
-- Name: page_blocks Authenticated users can create blocks; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can create blocks" ON public.page_blocks FOR INSERT WITH CHECK ((auth.uid() IS NOT NULL));


--
-- Name: blog_posts Authenticated users can create blog posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can create blog posts" ON public.blog_posts FOR INSERT WITH CHECK ((auth.uid() IS NOT NULL));


--
-- Name: menu_items Authenticated users can create menu items; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can create menu items" ON public.menu_items FOR INSERT WITH CHECK ((auth.uid() IS NOT NULL));


--
-- Name: pages Authenticated users can create pages; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can create pages" ON public.pages FOR INSERT WITH CHECK ((auth.uid() IS NOT NULL));


--
-- Name: site_settings Authenticated users can create site settings; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can create site settings" ON public.site_settings FOR INSERT WITH CHECK ((auth.uid() IS NOT NULL));


--
-- Name: page_blocks Authenticated users can delete blocks; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can delete blocks" ON public.page_blocks FOR DELETE USING ((auth.uid() IS NOT NULL));


--
-- Name: blog_posts Authenticated users can delete blog posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can delete blog posts" ON public.blog_posts FOR DELETE USING ((auth.uid() IS NOT NULL));


--
-- Name: menu_items Authenticated users can delete menu items; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can delete menu items" ON public.menu_items FOR DELETE USING ((auth.uid() IS NOT NULL));


--
-- Name: pages Authenticated users can delete pages; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can delete pages" ON public.pages FOR DELETE USING ((auth.uid() IS NOT NULL));


--
-- Name: page_blocks Authenticated users can update blocks; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can update blocks" ON public.page_blocks FOR UPDATE USING ((auth.uid() IS NOT NULL));


--
-- Name: blog_posts Authenticated users can update blog posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can update blog posts" ON public.blog_posts FOR UPDATE USING ((auth.uid() IS NOT NULL));


--
-- Name: menu_items Authenticated users can update menu items; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can update menu items" ON public.menu_items FOR UPDATE USING ((auth.uid() IS NOT NULL));


--
-- Name: pages Authenticated users can update pages; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can update pages" ON public.pages FOR UPDATE USING ((auth.uid() IS NOT NULL));


--
-- Name: site_settings Authenticated users can update site settings; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can update site settings" ON public.site_settings FOR UPDATE USING ((auth.uid() IS NOT NULL));


--
-- Name: page_blocks Authenticated users can view all blocks; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can view all blocks" ON public.page_blocks FOR SELECT USING ((auth.uid() IS NOT NULL));


--
-- Name: blog_posts Authenticated users can view all blog posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can view all blog posts" ON public.blog_posts FOR SELECT USING ((auth.uid() IS NOT NULL));


--
-- Name: pages Authenticated users can view all pages; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can view all pages" ON public.pages FOR SELECT USING ((auth.uid() IS NOT NULL));


--
-- Name: blog_posts; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

--
-- Name: menu_items; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

--
-- Name: page_blocks; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.page_blocks ENABLE ROW LEVEL SECURITY;

--
-- Name: pages; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

--
-- Name: site_settings; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--




COMMIT;
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
-- Name: app_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.app_role AS ENUM (
    'admin',
    'moderator',
    'user'
);


--
-- Name: application_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.application_status AS ENUM (
    'saved',
    'in_progress',
    'documents_pending',
    'applied',
    'under_review',
    'accepted',
    'rejected'
);


--
-- Name: assessment_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.assessment_type AS ENUM (
    'psychometric',
    'career_interest',
    'emotional_intelligence',
    'skill_gap'
);


--
-- Name: student_stream; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.student_stream AS ENUM (
    'pcm',
    'pcb',
    'pcmb',
    'commerce',
    'arts'
);


--
-- Name: cleanup_old_rate_limits(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.cleanup_old_rate_limits() RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  DELETE FROM public.chat_rate_limits
  WHERE created_at < now() - interval '24 hours';
END;
$$;


--
-- Name: handle_new_user(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.handle_new_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'display_name');
  RETURN NEW;
END;
$$;


--
-- Name: has_role(uuid, public.app_role); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.has_role(_user_id uuid, _role public.app_role) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;


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
-- Name: chat_messages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.chat_messages (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    role text NOT NULL,
    content text NOT NULL,
    image_url text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT chat_messages_role_check CHECK ((role = ANY (ARRAY['user'::text, 'assistant'::text])))
);


--
-- Name: chat_rate_limits; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.chat_rate_limits (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: profiles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.profiles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    display_name text,
    avatar_url text,
    bio text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: registrations_12th_learners; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.registrations_12th_learners (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    full_name text NOT NULL,
    email text,
    phone text NOT NULL,
    date_of_birth text,
    school_name text,
    board text,
    stream text,
    percentage text,
    preferred_course text,
    preferred_institution text,
    career_interests text[],
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: registrations_employers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.registrations_employers (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    company_name text NOT NULL,
    industry text,
    company_size text,
    website text,
    contact_name text NOT NULL,
    contact_email text NOT NULL,
    contact_phone text NOT NULL,
    designation text,
    roles_hiring text,
    experience_level text,
    job_location text,
    hiring_timeline text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: registrations_learners; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.registrations_learners (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    full_name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    date_of_birth text,
    institution text,
    degree text,
    specialization text,
    graduation_year text,
    experience text,
    job_role text,
    skills text,
    preferred_role text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: scholarship_applications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.scholarship_applications (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    scholarship_id text NOT NULL,
    scholarship_name text NOT NULL,
    scholarship_provider text NOT NULL,
    scholarship_amount text,
    scholarship_deadline text,
    status public.application_status DEFAULT 'saved'::public.application_status NOT NULL,
    applied_date timestamp with time zone,
    notes text,
    reminder_date date,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: student_assessment_attempts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.student_assessment_attempts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    stream public.student_stream NOT NULL,
    attempt_number integer DEFAULT 1 NOT NULL,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    completed_at timestamp with time zone,
    current_question integer DEFAULT 0 NOT NULL,
    total_questions integer DEFAULT 30 NOT NULL,
    is_paused boolean DEFAULT false NOT NULL,
    questions_json jsonb,
    answers_json jsonb,
    course_recommendations jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: student_profiles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.student_profiles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    stream public.student_stream NOT NULL,
    marks_range text,
    entrance_exams text[],
    specific_interests text[],
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: student_question_history; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.student_question_history (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    attempt_id uuid,
    stream public.student_stream NOT NULL,
    question_text text NOT NULL,
    question_hash text NOT NULL,
    options jsonb NOT NULL,
    user_answer text,
    answered_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: user_assessment_attempts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_assessment_attempts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    assessment_type public.assessment_type NOT NULL,
    attempt_number integer DEFAULT 1 NOT NULL,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    completed_at timestamp with time zone,
    current_question integer DEFAULT 0 NOT NULL,
    total_questions integer DEFAULT 0 NOT NULL,
    score jsonb,
    narrative_result text,
    is_paused boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: user_question_history; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_question_history (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    assessment_type public.assessment_type NOT NULL,
    attempt_id uuid,
    question_text text NOT NULL,
    question_hash text NOT NULL,
    options jsonb NOT NULL,
    user_answer text,
    answered_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    role public.app_role NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: chat_messages chat_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.chat_messages
    ADD CONSTRAINT chat_messages_pkey PRIMARY KEY (id);


--
-- Name: chat_rate_limits chat_rate_limits_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.chat_rate_limits
    ADD CONSTRAINT chat_rate_limits_pkey PRIMARY KEY (id);


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- Name: profiles profiles_user_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_user_id_key UNIQUE (user_id);


--
-- Name: registrations_12th_learners registrations_12th_learners_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.registrations_12th_learners
    ADD CONSTRAINT registrations_12th_learners_pkey PRIMARY KEY (id);


--
-- Name: registrations_employers registrations_employers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.registrations_employers
    ADD CONSTRAINT registrations_employers_pkey PRIMARY KEY (id);


--
-- Name: registrations_learners registrations_learners_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.registrations_learners
    ADD CONSTRAINT registrations_learners_pkey PRIMARY KEY (id);


--
-- Name: scholarship_applications scholarship_applications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scholarship_applications
    ADD CONSTRAINT scholarship_applications_pkey PRIMARY KEY (id);


--
-- Name: scholarship_applications scholarship_applications_user_id_scholarship_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scholarship_applications
    ADD CONSTRAINT scholarship_applications_user_id_scholarship_id_key UNIQUE (user_id, scholarship_id);


--
-- Name: student_assessment_attempts student_assessment_attempts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_assessment_attempts
    ADD CONSTRAINT student_assessment_attempts_pkey PRIMARY KEY (id);


--
-- Name: student_profiles student_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_profiles
    ADD CONSTRAINT student_profiles_pkey PRIMARY KEY (id);


--
-- Name: student_profiles student_profiles_user_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_profiles
    ADD CONSTRAINT student_profiles_user_id_key UNIQUE (user_id);


--
-- Name: student_question_history student_question_history_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_question_history
    ADD CONSTRAINT student_question_history_pkey PRIMARY KEY (id);


--
-- Name: user_assessment_attempts user_assessment_attempts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_assessment_attempts
    ADD CONSTRAINT user_assessment_attempts_pkey PRIMARY KEY (id);


--
-- Name: user_question_history user_question_history_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_question_history
    ADD CONSTRAINT user_question_history_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_user_id_role_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_role_key UNIQUE (user_id, role);


--
-- Name: idx_chat_messages_created_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_chat_messages_created_at ON public.chat_messages USING btree (created_at DESC);


--
-- Name: idx_chat_messages_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_chat_messages_user_id ON public.chat_messages USING btree (user_id);


--
-- Name: idx_chat_rate_limits_user_time; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_chat_rate_limits_user_time ON public.chat_rate_limits USING btree (user_id, created_at);


--
-- Name: idx_student_attempts_stream; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_student_attempts_stream ON public.student_assessment_attempts USING btree (stream);


--
-- Name: idx_student_attempts_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_student_attempts_user_id ON public.student_assessment_attempts USING btree (user_id);


--
-- Name: idx_student_profiles_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_student_profiles_user_id ON public.student_profiles USING btree (user_id);


--
-- Name: idx_student_questions_hash; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_student_questions_hash ON public.student_question_history USING btree (question_hash);


--
-- Name: idx_student_questions_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_student_questions_user_id ON public.student_question_history USING btree (user_id);


--
-- Name: idx_user_assessment_attempts_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_user_assessment_attempts_type ON public.user_assessment_attempts USING btree (assessment_type);


--
-- Name: idx_user_assessment_attempts_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_user_assessment_attempts_user_id ON public.user_assessment_attempts USING btree (user_id);


--
-- Name: idx_user_question_history_attempt_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_user_question_history_attempt_id ON public.user_question_history USING btree (attempt_id);


--
-- Name: idx_user_question_history_hash; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_user_question_history_hash ON public.user_question_history USING btree (question_hash);


--
-- Name: idx_user_question_history_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_user_question_history_user_id ON public.user_question_history USING btree (user_id);


--
-- Name: profiles update_profiles_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: registrations_12th_learners update_registrations_12th_learners_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_registrations_12th_learners_updated_at BEFORE UPDATE ON public.registrations_12th_learners FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: registrations_employers update_registrations_employers_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_registrations_employers_updated_at BEFORE UPDATE ON public.registrations_employers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: registrations_learners update_registrations_learners_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_registrations_learners_updated_at BEFORE UPDATE ON public.registrations_learners FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: scholarship_applications update_scholarship_applications_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_scholarship_applications_updated_at BEFORE UPDATE ON public.scholarship_applications FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: student_assessment_attempts update_student_attempts_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_student_attempts_updated_at BEFORE UPDATE ON public.student_assessment_attempts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: student_profiles update_student_profiles_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_student_profiles_updated_at BEFORE UPDATE ON public.student_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: user_assessment_attempts update_user_assessment_attempts_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_user_assessment_attempts_updated_at BEFORE UPDATE ON public.user_assessment_attempts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: profiles profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: registrations_12th_learners registrations_12th_learners_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.registrations_12th_learners
    ADD CONSTRAINT registrations_12th_learners_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: registrations_employers registrations_employers_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.registrations_employers
    ADD CONSTRAINT registrations_employers_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: registrations_learners registrations_learners_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.registrations_learners
    ADD CONSTRAINT registrations_learners_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: student_question_history student_question_history_attempt_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_question_history
    ADD CONSTRAINT student_question_history_attempt_id_fkey FOREIGN KEY (attempt_id) REFERENCES public.student_assessment_attempts(id);


--
-- Name: user_question_history user_question_history_attempt_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_question_history
    ADD CONSTRAINT user_question_history_attempt_id_fkey FOREIGN KEY (attempt_id) REFERENCES public.user_assessment_attempts(id) ON DELETE CASCADE;


--
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: registrations_12th_learners Admins can view all 12th learner registrations; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view all 12th learner registrations" ON public.registrations_12th_learners FOR SELECT USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: registrations_employers Admins can view all employer registrations; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view all employer registrations" ON public.registrations_employers FOR SELECT USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: registrations_learners Admins can view all learner registrations; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view all learner registrations" ON public.registrations_learners FOR SELECT USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: registrations_12th_learners Anyone can insert 12th learner registrations; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can insert 12th learner registrations" ON public.registrations_12th_learners FOR INSERT WITH CHECK (true);


--
-- Name: registrations_employers Anyone can insert employer registrations; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can insert employer registrations" ON public.registrations_employers FOR INSERT WITH CHECK (true);


--
-- Name: registrations_learners Anyone can insert learner registrations; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can insert learner registrations" ON public.registrations_learners FOR INSERT WITH CHECK (true);


--
-- Name: profiles Authenticated users can view all profiles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can view all profiles" ON public.profiles FOR SELECT TO authenticated USING (true);


--
-- Name: scholarship_applications Users can create their own applications; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create their own applications" ON public.scholarship_applications FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: student_assessment_attempts Users can create their own attempts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create their own attempts" ON public.student_assessment_attempts FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: user_assessment_attempts Users can create their own attempts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create their own attempts" ON public.user_assessment_attempts FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: chat_messages Users can create their own messages; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create their own messages" ON public.chat_messages FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: student_profiles Users can create their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create their own profile" ON public.student_profiles FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: user_question_history Users can create their own question history; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create their own question history" ON public.user_question_history FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: student_question_history Users can create their own questions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can create their own questions" ON public.student_question_history FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: scholarship_applications Users can delete their own applications; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can delete their own applications" ON public.scholarship_applications FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: chat_messages Users can delete their own messages; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can delete their own messages" ON public.chat_messages FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: profiles Users can insert their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: chat_rate_limits Users can insert their own rate limits; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can insert their own rate limits" ON public.chat_rate_limits FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: scholarship_applications Users can update their own applications; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own applications" ON public.scholarship_applications FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: student_assessment_attempts Users can update their own attempts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own attempts" ON public.student_assessment_attempts FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: user_assessment_attempts Users can update their own attempts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own attempts" ON public.user_assessment_attempts FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: profiles Users can update their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: student_profiles Users can update their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own profile" ON public.student_profiles FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: user_question_history Users can update their own question history; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own question history" ON public.user_question_history FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: student_question_history Users can update their own questions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own questions" ON public.student_question_history FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: registrations_12th_learners Users can view their own 12th learner registrations; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own 12th learner registrations" ON public.registrations_12th_learners FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: scholarship_applications Users can view their own applications; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own applications" ON public.scholarship_applications FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: student_assessment_attempts Users can view their own attempts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own attempts" ON public.student_assessment_attempts FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: user_assessment_attempts Users can view their own attempts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own attempts" ON public.user_assessment_attempts FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: registrations_employers Users can view their own employer registrations; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own employer registrations" ON public.registrations_employers FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: registrations_learners Users can view their own learner registrations; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own learner registrations" ON public.registrations_learners FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: chat_messages Users can view their own messages; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own messages" ON public.chat_messages FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: student_profiles Users can view their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own profile" ON public.student_profiles FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: user_question_history Users can view their own question history; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own question history" ON public.user_question_history FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: student_question_history Users can view their own questions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own questions" ON public.student_question_history FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: chat_rate_limits Users can view their own rate limits; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own rate limits" ON public.chat_rate_limits FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: user_roles Users can view their own roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: chat_messages; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

--
-- Name: chat_rate_limits; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.chat_rate_limits ENABLE ROW LEVEL SECURITY;

--
-- Name: profiles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: registrations_12th_learners; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.registrations_12th_learners ENABLE ROW LEVEL SECURITY;

--
-- Name: registrations_employers; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.registrations_employers ENABLE ROW LEVEL SECURITY;

--
-- Name: registrations_learners; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.registrations_learners ENABLE ROW LEVEL SECURITY;

--
-- Name: scholarship_applications; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.scholarship_applications ENABLE ROW LEVEL SECURITY;

--
-- Name: student_assessment_attempts; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.student_assessment_attempts ENABLE ROW LEVEL SECURITY;

--
-- Name: student_profiles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: student_question_history; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.student_question_history ENABLE ROW LEVEL SECURITY;

--
-- Name: user_assessment_attempts; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_assessment_attempts ENABLE ROW LEVEL SECURITY;

--
-- Name: user_question_history; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_question_history ENABLE ROW LEVEL SECURITY;

--
-- Name: user_roles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--




COMMIT;
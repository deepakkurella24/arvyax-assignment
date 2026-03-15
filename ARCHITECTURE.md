# System Architecture

## Overview

The application follows a standard MERN architecture.

User → React Frontend → Express API → MongoDB

AI analysis is handled through the Groq LLM API.

---

## How would you scale this to 100k users?

To scale the system:

1. Horizontal Scaling
   Deploy multiple backend instances behind a load balancer.

2. API Gateway
   Use an API gateway to manage traffic and authentication.

3. Database Scaling
   Use MongoDB Atlas sharding and replica sets for high availability.

4. Queue System
   Move AI analysis jobs to background workers using a queue system like Redis + BullMQ.

5. CDN
   Serve frontend assets through a CDN for global performance.

---

## How would you reduce LLM cost?

1. Only analyze new journal entries instead of re-running analysis.

2. Use smaller models for simple emotion classification.

3. Limit text length before sending to the LLM.

4. Batch multiple requests when possible.

5. Cache results to avoid repeated analysis.

---

## How would you cache repeated analysis?

If a journal entry with identical text already exists:

1. Store the analysis result in the database.

2. Before calling the LLM:

   * compute a hash of the text
   * check if analysis already exists

3. If found:
   return cached result

Possible caching solutions:

* Redis
* In-memory cache
* MongoDB indexed lookup

---

## How would you protect sensitive journal data?

1. Authentication
   JWT-based authentication ensures only authorized users access their journals.

2. Access Control
   Each API verifies the userId matches the authenticated user.

3. Encryption
   Sensitive data could be encrypted before storing in the database.

4. Secure Cookies
   Use httpOnly cookies to prevent XSS attacks.

5. HTTPS
   All communication between frontend and backend is encrypted.

6. Rate Limiting
   Prevent abuse using request rate limits.

---

## Future Improvements

* Streaming LLM responses
* Redis caching
* Rate limiting middleware
* Docker containerization
* Background job processing for AI tasks

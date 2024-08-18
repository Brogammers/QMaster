package com.que.que;

import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.CacheControl;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class QueApplication implements WebMvcConfigurer {

	public static void main(String[] args) {
		SpringApplication.run(QueApplication.class, args);
	}

	@Override
	public void addResourceHandlers(@NonNull ResourceHandlerRegistry registry) {

		// Register resource handler for images
		registry.addResourceHandler("/images/**").addResourceLocations("/WEB-INF/images/")
				.setCacheControl(CacheControl.maxAge(2, TimeUnit.HOURS).cachePublic());
	}

}
